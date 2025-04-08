ALTER TABLE Person
ADD CONSTRAINT CK_NoSelfReference
CHECK (
    Father_Id <> Person_Id AND 
    Mother_Id <> Person_Id AND 
    Spouse_Id <> Person_Id
);
