--create table 
create table FamilyTree(
    ID int identity(1,1) primary key,
    Person_Id int not null,
    foreign key (Person_Id) references Person(Person_Id),
    Relative_Id int not null,
    foreign key (Relative_Id) references Person(Person_Id),
    Connection_Type nvarchar(20) not null 
    check (Connection_Type IN ('father','mother','son','daughter','brother','sister', 'M_spouse','F_spouse'))
);

--insert values to the table by connection

--father connection
insert into FamilyTree (Person_Id, Relative_Id, Connection_Type)
select  Person_Id,Father_Id,'father'
from Person
where Father_Id is not null

--mother connection
insert into FamilyTree (Person_Id, Relative_Id, Connection_Type)
select  Person_Id,Mother_Id,'mother'
from Person
where Mother_Id is not null

--children from mother
insert into FamilyTree (Person_Id, Relative_Id, Connection_Type)
select Mother_Id,Person_Id,
case when Gender='M'
then 'son'
else 'daughter'
end 
from Person
where Mother_Id is not null

--children from father
insert into FamilyTree (Person_Id, Relative_Id, Connection_Type)
select Father_Id,Person_Id,
case when Gender='M'
then 'son'
else 'daughter'
end 
from Person
where Father_Id is not null


--spouse connection
insert into FamilyTree (Person_Id, Relative_Id, Connection_Type)
select a.Person_Id,a.Spouse_Id,b.Gender+'_spouse'
from Person a
join Person b
on a.Spouse_Id=b.Person_Id
where a.Spouse_Id is not null

--sibilings connection
insert into FamilyTree (Person_Id, Relative_Id, Connection_Type)
select a.Person_Id, b.Person_Id,
    case  
        when b.Gender = 'M' then 'brother'
        else 'sister'
    end
from Person a
join Person b
     on ((a.Father_Id = b.Father_Id and a.Father_Id is not null) or
        (a.Mother_Id = b.Mother_Id and a.Mother_Id is not null))
    and a.Person_Id <> b.Person_Id

        


--exc 2
 --Completing mutual spouse data
 insert into FamilyTree (Person_Id, Relative_Id, Connection_Type)
 select  p.Spouse_Id,p.Person_Id,p.Gender+'_spouse'
 from Person p
 join Person f
 on p.Spouse_Id=f.Person_Id
 where p.Spouse_Id is not null and f.Spouse_Id is null  




