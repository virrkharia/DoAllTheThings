CREATE TABLE [dbo].[Todo]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Text] NVARCHAR(MAX) NOT NULL, 
    [DueDate] DATETIME NULL, 
    [Priority] INT NOT NULL
)
