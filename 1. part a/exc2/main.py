import pandas as pd
from datetime import datetime
import os
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed

# exc2
# convert from xlsx to cs
xl_file = pd.read_excel('time_series.xlsx')
xl_file.to_csv('time_series.csv', index=None, header=True)


# # סעיף 1
# A. Checking the validity of the file and removing the invalid rows from the dataframe
def is_valid_date(date):
    try:
        datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        return False
    return True


def validate_line(row):
    if is_valid_date(row['timestamp']):
        return True
    return False


# B. Calculate the average code segment for each hour
def avg_per_date_and_hour(file_name):
    df = pd.read_csv(file_name)
    df.drop_duplicates(subset=['timestamp'], inplace=True)
    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df.dropna(inplace=True)
    dict_avg_data = {}
    for index, row in df.iterrows():
        if validate_line(row):
            date = datetime.strptime(row['timestamp'], "%Y-%m-%d %H:%M:%S").strftime("%Y-%m-%d %H:00:00")
            if date not in dict_avg_data:
                dict_avg_data[date] = {'sum': row['value'], 'count': 1}
            else:
                dict_avg_data[date]['sum'] += row['value']
                dict_avg_data[date]['count'] += 1
        else:
            print(f"line {row} no validate!")
    result_avg_dict = {}
    for key, values in dict_avg_data.items():
        result_avg_dict[key] = values['sum'] / values['count']

    return result_avg_dict


# סעיף 1
# print(avg_per_date_and_hour())
# output = pd.DataFrame(list(avg_per_date_and_hour().items()), columns=['timestamp', 'average'])
# output.to_csv('output_avg_section_b1.csv', index=False)

# # סעיף 2
files = []


def sort_csv_data_to_files(file_path):
    csv_data = pd.read_csv(file_path)

    date_files = {}

    for index, row in csv_data.iterrows():
        date = row['timestamp'].split()[0]
        if date not in date_files:
            date_files[date] = []
        date_files[date].append([row['timestamp'], row['value']])

    for date, rows in date_files.items():
        file_name = f"time_series_files/time_series_{date}.csv"

        if not os.path.exists(file_name):
            with open(file_name, 'a', newline='\n') as f:
                writer = csv.writer(f)
                writer.writerow(['timestamp', 'value'])
                writer.writerows(rows)
                files.append(file_name)


def merge_avg_results():
    total_avg = {}
    with ThreadPoolExecutor(max_workers=6)as executor:
        results = [executor.submit(avg_per_date_and_hour, file) for file in files]

    for res in as_completed(results):
        result_dict = res.result()
        for key, avg in result_dict.items():
            total_avg[key] = avg
    output = pd.DataFrame(list(total_avg.items()), columns=['timestamp', 'average'])
    output.to_csv('output_avg_section_b2.csv', index=False)


sort_csv_data_to_files('time_series.csv')
merge_avg_results()

# 3.
"""
נתכנן את זה כך שיהיה פונקציה שתאזין לקבלת קבצים בזרם 
כל קובץ שיתקבל נבצע עליו את פעולת החישוב
את התוצאה של החישוב נעדכן במבנה נתונים זמני 
שיכיל את התוצאות שעוד לא נכתבו לקובץ הסופי עד כה  
בכל פרק זמן של כמה דקות(5-10) 
נרשום לקובץ את תוצאת מבנה הנתונים ונאתחל את המבנה 
ככה העומס על כתיבה וקריאה לקובץ יפחת 

"""

# 4.
# נוסיף בקוד לעיל בדיקה איזה סיומת הקובץ המתקבל
"""
1. האחסון של קבצי פרקט יעילה מכיוון שהם דחוסים אוטומטית את הנתונים מה שטוב לקבצים גדולים 
2.ביצועים טובים יותר אפשר להתמקד רק בנתונים הרלוונטים כרגע במהירות רבה 
3.פרקט שומר את סוג הנתונים של כל עמודה בסכימה פשוטה
  כך שניתן להוסיף עמודות חדשות בקלות ולשמור על התאמה  בין גרסאות שונות של הקובץ
"""


def avg_per_date_and_hour(file_name):
    if file_name.endswith('.csv'):
        df = pd.read_csv(file_name)
    if file_name.endswith('.parquet'):
        df = pd.read_parquet(file_name, engine='pyarrow')
    df.drop_duplicates(subset=['timestamp'], inplace=True)
    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
    df.dropna(subset=['timestamp', 'value'], inplace=True)
    dict_avg_data = {}
    for index, row in df.iterrows():
        date = row['timestamp'].strftime("%Y-%m-%d %H:00:00")
        if date not in dict_avg_data:
            dict_avg_data[date] = {'sum': row['value'], 'count': 1}
        else:
            dict_avg_data[date]['sum'] += row['value']
            dict_avg_data[date]['count'] += 1

    result_avg_dict = {}
    for key, values in dict_avg_data.items():
        result_avg_dict[key] = values['sum'] / values['count']

    return result_avg_dict


def sort_csv_data_to_files(file_path):
    if file_path.endswith('.csv'):
        data = pd.read_csv(file_path)
    if file_path.endswith('.parquet'):
        data = pd.read_parquet(file_path, engine='pyarrow')

    date_files = {}

    for index, row in data.iterrows():
        date = row['timestamp'].split()[0].replace('/', '-')
        if date not in date_files:
            date_files[date] = []
        date_files[date].append([row['timestamp'], row['value']])

    for date, rows in date_files.items():
        if file_path.endswith('.csv'):
            file_name = f"time_series_files/time_series_{date}.csv"
            with open(file_name, 'a', newline='\n') as f:
                writer = csv.writer(f)
                writer.writerow(['timestamp', 'value'])
                writer.writerows(rows)
        elif file_path.endswith('.parquet'):
            file_name = f"time_series_files/time_series_{date}.parquet"
            df = pd.DataFrame(rows, columns=['timestamp', 'value'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], dayfirst=True)
            df.to_parquet(file_name, engine='pyarrow', index=False)
        files.append(file_name)


def merge_avg_results():
    total_avg = {}
    with ThreadPoolExecutor(max_workers=6)as executor:
        results = [executor.submit(avg_per_date_and_hour, file) for file in files]

    for res in as_completed(results):
        result_dict = res.result()
        for key, avg in result_dict.items():
            total_avg[key] = avg
    output = pd.DataFrame(list(total_avg.items()), columns=['timestamp', 'average'])
    output.to_csv('output_avg_section_b4.csv', index=False)


# אופציה של שליחת קובץ CSV
sort_csv_data_to_files('time_series.csv')
merge_avg_results()

# אופציה של שליחת קובץ PARQUET
sort_csv_data_to_files('time_series.parquet')
merge_avg_results()
