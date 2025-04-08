CREATE TABLE Person (
    Person_Id INT identity(1,1) PRIMARY KEY, 
    Personal_Name NVARCHAR(50) NOT NULL, 
    Family_Name NVARCHAR(50) NOT NULL, 
    Gender NCHAR(1) NOT NULL CHECK (Gender IN ('M', 'F')),
    Father_Id INT, 
    Mother_Id INT, 
    Spouse_Id INT, 

    CONSTRAINT FK_Person_Father FOREIGN KEY (Father_Id) REFERENCES Person(Person_Id),
    CONSTRAINT FK_Person_Mother FOREIGN KEY (Mother_Id) REFERENCES Person(Person_Id),
    CONSTRAINT FK_Person_Spouse FOREIGN KEY (Spouse_Id) REFERENCES Person(Person_Id),

    CONSTRAINT CK_NoSelfReference CHECK (
        Father_Id <> Person_Id AND 
        Mother_Id <> Person_Id AND 
        Spouse_Id <> Person_Id
    )
);
