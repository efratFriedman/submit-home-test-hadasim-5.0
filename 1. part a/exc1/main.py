import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import Counter

# 1. Splitting the file into smaller parts
xl_file = pd.ExcelFile('logs.txt.xlsx')

num_lines = 100000  # each 100,000 lines which is still a fixed number, will be entered into the file

for sheet in xl_file.sheet_names:
    df = xl_file.parse(sheet, header=None)

    num_files = len(df) // num_lines
    if len(df) % num_lines != 0:  # if there is no exact number of names that are exactly divide 100,000
        num_files += 1  # we will add another file to the remaining lines

    for i in range(num_files):
        chunk = df[i * num_lines:(i + 1) * num_lines]

        txt_filename = f"logs_part_{i + 1}.txt"

        with open(txt_filename, 'w', encoding='utf-8') as f:
            for j, row in chunk.iterrows():
                f.write(str(row.values[0]) + '\n')


# 2. Count per part of the amount of errors
def error_frequency_counting(file_name):
    error_counts = Counter()  # data structure consisting of a dictionary whose key is the error code and whose value
    # is the number of errors of the type
    with open(file_name, 'r', encoding='utf-8') as file:
        for line in file:
            err_code = line.split("Error:")[1].strip()
            if err_code not in error_counts:
                error_counts[err_code] = 1
            else:
                error_counts[err_code] += 1

    return error_counts


# 3.merge the frequency of all small parts
def merge_frequency_counting():
    total_err_counts = Counter()
    with ThreadPoolExecutor(max_workers=4) as executor:  # dividing into threads to create parallelism
        files = [f"logs_part_{k + 1}.txt" for k in range(num_files)]
        results = [executor.submit(error_frequency_counting, file) for file in
                   files]  # receives the results as soon as each thread end

        for res in as_completed(results):  # combining all the results into one data structure
            total_err_counts.update(res.result())

    return total_err_counts


# 4.printing the N most common error codes
def print_n_frequency(n):
    # built in function of the data structure that actually
    # works on sorting the structure and returning the N most common
    print(merge_frequency_counting().most_common(n), sep="\n")


input_usr = int(input("enter N"))
print_n_frequency(input_usr)

# 5. Runtime Analysis
"""
בחלק 1 מעבר על השורות כדי לחלק לקבצים זה O(m)
כאשר m זה מספר השורות בקובץ הגדול 
בחלק 2 לכל קובץ קטן מעבר על כל השורות וספירה של השכיחות 
O(f*t)
כאשר f כמות הקבצים 
וt כמות סוגי השגיאות 
מכיוון וחילקנו לקבצים קטנים קובץ של מליוני שורות
 נדע ששני הפרמטרים מספרים קבועים ולכן בסהכ זמן הריצה של חלק זה O(1)
 בחלק 3 איחוד כל ספירות השכיחות הוא O(e)
 כאשר e זה כמות  השגיאות השונות
 חלק 4 מבוסס על מיון ולאחר מכן מעבר על N הרצויים והחזרתם 
 ולכן מיון הוא loge
 ובסהכ זמן הריצה של חלק זה O(eloge+N)
 נוכל לוותר על הN שכן הוא קטן או שווה לe ולא יכול להיות יותר 
  זמן הריצה הסופי של כל התרגיל הוא :
  O(m+eloge)
  במקרה הגרוע כמות סוגי השגיאות השונות הוא m כמספר השורות וביקשו את m השכיחים גם כמספר השורות 
  ולכן ההחלטה על איזה מהביטויים אפשר לוותר תלויה במקרה הגרוע הטוב והממוצע 
"""
