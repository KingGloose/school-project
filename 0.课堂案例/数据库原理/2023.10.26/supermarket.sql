USE [master]
GO
/****** Object:  Database [supermarket]    Script Date: 2023/10/25 19:21:11 ******/
CREATE DATABASE [supermarket]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'supermarket', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\supermarket.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'supermarket_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\supermarket_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [supermarket] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [supermarket].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [supermarket] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [supermarket] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [supermarket] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [supermarket] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [supermarket] SET ARITHABORT OFF 
GO
ALTER DATABASE [supermarket] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [supermarket] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [supermarket] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [supermarket] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [supermarket] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [supermarket] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [supermarket] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [supermarket] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [supermarket] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [supermarket] SET  DISABLE_BROKER 
GO
ALTER DATABASE [supermarket] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [supermarket] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [supermarket] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [supermarket] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [supermarket] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [supermarket] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [supermarket] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [supermarket] SET RECOVERY FULL 
GO
ALTER DATABASE [supermarket] SET  MULTI_USER 
GO
ALTER DATABASE [supermarket] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [supermarket] SET DB_CHAINING OFF 
GO
ALTER DATABASE [supermarket] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [supermarket] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [supermarket] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [supermarket] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'supermarket', N'ON'
GO
ALTER DATABASE [supermarket] SET QUERY_STORE = OFF
GO
USE [supermarket]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 2023/10/25 19:21:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryNO] [varchar](20) NOT NULL,
	[CategoryName] [varchar](100) NOT NULL,
	[Description] [varchar](500) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Goods]    Script Date: 2023/10/25 19:21:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Goods](
	[GoodsNO] [varchar](20) NOT NULL,
	[SupplierNO] [varchar](20) NULL,
	[CategoryNO] [varchar](20) NULL,
	[GoodsName] [varchar](100) NULL,
	[Barcode] [varchar](100) NULL,
	[InPrice] [decimal](18, 2) NULL,
	[SalePrice] [decimal](18, 2) NULL,
	[Number] [int] NULL,
	[ProductTime] [smalldatetime] NULL,
	[QGPeriod] [tinyint] NULL,
PRIMARY KEY CLUSTERED 
(
	[GoodsNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SaleBill]    Script Date: 2023/10/25 19:21:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SaleBill](
	[GoodsNO] [varchar](20) NOT NULL,
	[SNO] [varchar](20) NOT NULL,
	[HappenTime] [datetime] NULL,
	[Number] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[GoodsNO] ASC,
	[SNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Student]    Script Date: 2023/10/25 19:21:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Student](
	[SNO] [varchar](20) NOT NULL,
	[SName] [varchar](20) NOT NULL,
	[BirthYear] [int] NOT NULL,
	[Ssex] [varchar](2) NOT NULL,
	[College] [varchar](100) NOT NULL,
	[Major] [varchar](100) NOT NULL,
	[WeiXin] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[SNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supplier]    Script Date: 2023/10/25 19:21:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supplier](
	[SupplierNO] [varchar](20) NOT NULL,
	[SupplierName] [varchar](100) NOT NULL,
	[Address] [varchar](200) NOT NULL,
	[Telephone] [varchar](20) NOT NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[SupplierNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Category] ([CategoryNO], [CategoryName], [Description]) VALUES (N'CN001', N'咖啡', N'速溶咖啡、咖啡粉、罐装咖啡、')
INSERT [dbo].[Category] ([CategoryNO], [CategoryName], [Description]) VALUES (N'CN002', N'洗发水', N'袋装、瓶装洗发水')
INSERT [dbo].[Category] ([CategoryNO], [CategoryName], [Description]) VALUES (N'CN003', N'方便面', N'袋装、碗装方便面')
GO
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0001', N'Sup001', N'CN001', N'麦氏威尔冰咖啡', NULL, CAST(5.79 AS Decimal(18, 2)), CAST(7.80 AS Decimal(18, 2)), 20, CAST(N'2016-02-08T00:00:00' AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0002', N'Sup002', N'CN001', N'捷荣三合一咖啡', NULL, CAST(12.30 AS Decimal(18, 2)), CAST(17.30 AS Decimal(18, 2)), 15, CAST(N'2017-10-08T00:00:00' AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0003', N'Sup002', N'CN001', N'力神咖啡', NULL, CAST(1.81 AS Decimal(18, 2)), CAST(2.70 AS Decimal(18, 2)), 30, CAST(N'2018-05-06T00:00:00' AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0004', N'Sup001', N'CN001', N'麦氏威尔小三合一咖啡', NULL, CAST(8.12 AS Decimal(18, 2)), CAST(10.80 AS Decimal(18, 2)), 20, CAST(N'2017-05-06T00:00:00' AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0005', N'Sup003', N'CN001', N'雀巢香滑咖啡饮料', NULL, CAST(1.99 AS Decimal(18, 2)), CAST(2.70 AS Decimal(18, 2)), 3, CAST(N'2018-01-01T00:00:00' AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0006', N'Sup003', N'CN001', N'雀巢听装咖啡', NULL, CAST(84.21 AS Decimal(18, 2)), CAST(113.70 AS Decimal(18, 2)), 6, CAST(N'2018-05-06T00:00:00' AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0007', N'Sup004', N'CN002', N'夏士莲丝质柔顺洗发水', NULL, CAST(25.85 AS Decimal(18, 2)), CAST(35.70 AS Decimal(18, 2)), 30, CAST(N'2018-03-08T00:00:00' AS SmallDateTime), 36)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0008', N'Sup005', N'CN002', N'飞逸清新爽洁洗发水', NULL, CAST(20.47 AS Decimal(18, 2)), CAST(30.00 AS Decimal(18, 2)), 50, CAST(N'2018-03-09T00:00:00' AS SmallDateTime), 36)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0009', N'Sup005', N'CN002', N'力士柔亮洗发水（中/干）', NULL, CAST(22.65 AS Decimal(18, 2)), CAST(32.30 AS Decimal(18, 2)), 20, CAST(N'2017-12-08T00:00:00' AS SmallDateTime), 36)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [Barcode], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0010', N'Sup005', N'CN002', N'风影去屑洗发水（清爽）', NULL, CAST(22.98 AS Decimal(18, 2)), CAST(34.20 AS Decimal(18, 2)), 6, CAST(N'2017-10-07T00:00:00' AS SmallDateTime), 36)
GO
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'SO1', CAST(N'2016-02-08T00:00:00.000' AS DateTime), 3)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'SO2', CAST(N'2018-05-03T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'SO3', CAST(N'2018-04-07T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'SO6', CAST(N'2018-06-12T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0002', N'SO2', CAST(N'2018-05-08T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0002', N'SO5', CAST(N'2018-06-26T00:00:00.000' AS DateTime), 3)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0002', N'SO6', CAST(N'2018-06-16T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'SO1', CAST(N'2018-07-10T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'SO2', CAST(N'2018-07-08T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'SO5', CAST(N'2018-06-01T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'SO6', CAST(N'2018-07-01T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0005', N'SO5', CAST(N'2018-06-11T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0006', N'SO3', CAST(N'2018-05-07T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0007', N'SO1', CAST(N'2018-06-09T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0007', N'SO4', CAST(N'2018-06-08T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0007', N'SO5', CAST(N'2018-06-09T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0008', N'SO2', CAST(N'2018-06-04T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0008', N'SO6', CAST(N'2018-06-26T00:00:00.000' AS DateTime), 1)
GO
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO1', N'李明', 2001, N'男', N'CS', N'IT', N'wx001')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO2', N'徐好', 2000, N'女', N'CS', N'IT', N'wx002')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO3', N'武民', 1998, N'男', N'CS', N'MIS', N'wx003')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO4', N'闵红', 1999, N'女', N'ACC', N'AC', N'wx004')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO5', N'张小红', 1999, N'女', N'ACC', N'AC', N'wx005')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO6', N'张舒', 2001, N'男', N'CS', N'MIS', N'wx006')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO7', N'王民为', 1999, N'男', N'CS', N'MIS', N'wx007')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [College], [Major], [WeiXin]) VALUES (N'SO8', N'李士任', 2001, N'男', N'ACC', N'AC', N'wx008')
GO
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup001', N'卡夫食品（中国）有限公司广州分公司', N'广州佛山', N'12348768900')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup002', N'东莞市南城久润食品贸易部', N'广州东莞', N'13248768901')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup003', N'重庆飞鹤食品贸易公司', N'重庆解放牌', N'12648768901')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup004', N'重庆南山日化品贸易公司', N'重庆南坪', N'11648768903')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup005', N'重庆缙云日化品贸易公司', N'重庆北碚', N'19648768903')
GO
ALTER TABLE [dbo].[Goods]  WITH CHECK ADD FOREIGN KEY([CategoryNO])
REFERENCES [dbo].[Category] ([CategoryNO])
GO
ALTER TABLE [dbo].[Goods]  WITH CHECK ADD FOREIGN KEY([SupplierNO])
REFERENCES [dbo].[Supplier] ([SupplierNO])
GO
ALTER TABLE [dbo].[SaleBill]  WITH CHECK ADD FOREIGN KEY([GoodsNO])
REFERENCES [dbo].[Goods] ([GoodsNO])
GO
ALTER TABLE [dbo].[SaleBill]  WITH CHECK ADD FOREIGN KEY([SNO])
REFERENCES [dbo].[Student] ([SNO])
GO
USE [master]
GO
ALTER DATABASE [supermarket] SET  READ_WRITE 
GO
