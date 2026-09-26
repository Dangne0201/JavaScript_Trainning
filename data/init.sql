IF DB_ID('ExpenseDb') IS NULL
BEGIN
    CREATE DATABASE ExpenseDb;
END
GO

USE ExpenseDb;
GO

IF OBJECT_ID('dbo.Categories','U') IS NULL
BEGIN
    CREATE TABLE dbo.Categories(
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Categories)
BEGIN
    INSERT INTO dbo.Categories (Name)
    VALUES (N'Food'), (N'Transport'), (N'Bills'), (N'Other');
END
GO

IF OBJECT_ID('dbo.Expenses','U') IS NULL
BEGIN
    CREATE TABLE dbo.Expenses(
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Amount DECIMAL(18,2) NOT NULL,
        Date DATETIME2 NOT NULL,
        Note NVARCHAR(MAX) NULL,
        CategoryId INT NOT NULL,
        CONSTRAINT FK_Expenses_Categories FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(Id)
    );
END
GO
