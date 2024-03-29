USE [SuperMarket]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 2020/3/27 18:03:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryNO] [varchar](20) NOT NULL,
	[CategoryName] [varchar](100) NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Goods]    Script Date: 2020/3/27 18:03:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Goods](
	[GoodsNO] [varchar](20) NOT NULL,
	[SupplierNO] [varchar](20) NULL,
	[CategoryNO] [varchar](20) NULL,
	[GoodsName] [varchar](100) NULL,
	[InPrice] [decimal](18, 2) NULL,
	[SalePrice] [decimal](18, 2) NULL,
	[Number] [int] NULL,
	[ProductTime] [smalldatetime] NULL,
	[QGPeriod] [tinyint] NULL,
 CONSTRAINT [PK_Goods] PRIMARY KEY CLUSTERED 
(
	[GoodsNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SaleBill]    Script Date: 2020/3/27 18:03:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SaleBill](
	[GoodsNO] [varchar](20) NOT NULL,
	[SNO] [varchar](20) NOT NULL,
	[HappenTime] [datetime] NOT NULL,
	[Number] [int] NOT NULL,
 CONSTRAINT [PK_SALEBILL] PRIMARY KEY CLUSTERED 
(
	[GoodsNO] ASC,
	[SNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Student]    Script Date: 2020/3/27 18:03:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Student](
	[SNO] [varchar](20) NOT NULL,
	[SName] [varchar](20) NULL,
	[BirthYear] [int] NULL,
	[Ssex] [varchar](2) NULL,
	[college] [varchar](100) NULL,
	[Major] [varchar](100) NULL,
	[WeiXin] [varchar](100) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Supplier]    Script Date: 2020/3/27 18:03:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Supplier](
	[SupplierNO] [varchar](20) NOT NULL,
	[SupplierName] [varchar](100) NULL,
	[Address] [varchar](200) NULL,
	[Telephone] [varchar](20) NULL,
 CONSTRAINT [PK_SUPPLIER] PRIMARY KEY CLUSTERED 
(
	[SupplierNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[薪资表]    Script Date: 2020/3/27 18:03:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[薪资表](
	[薪级编号] [char](3) NOT NULL,
	[薪级名称] [nchar](10) NULL,
	[基础薪资] [numeric](8, 2) NULL,
	[应发薪资] [numeric](8, 2) NOT NULL,
	[实发薪资] [numeric](8, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[薪级编号] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[Category] ([CategoryNO], [CategoryName], [Description]) VALUES (N'CN001', N'咖啡', N'速溶咖啡、咖啡粉、罐装咖啡')
INSERT [dbo].[Category] ([CategoryNO], [CategoryName], [Description]) VALUES (N'CN002', N'洗发水', N'袋装、瓶装洗发水')
INSERT [dbo].[Category] ([CategoryNO], [CategoryName], [Description]) VALUES (N'CN003', N'方便面', N'袋装、碗装方便面')
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0001', N'Sup001', N'CN001', N'麦氏威尔冰咖啡', CAST(5.79 AS Decimal(18, 2)), CAST(7.80 AS Decimal(18, 2)), 20, CAST(0xA5A60000 AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0002', N'Sup002', N'CN001', N'捷荣三合一咖啡', CAST(12.30 AS Decimal(18, 2)), CAST(17.30 AS Decimal(18, 2)), 15, CAST(0xA8060000 AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0003', N'Sup002', N'CN001', N'力神咖啡', CAST(1.81 AS Decimal(18, 2)), CAST(2.70 AS Decimal(18, 2)), 30, CAST(0xA8D80000 AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0004', N'Sup001', N'CN001', N'麦氏威尔小三合一咖啡', CAST(8.12 AS Decimal(18, 2)), CAST(10.80 AS Decimal(18, 2)), 20, CAST(0xA76B0000 AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0005', N'Sup003', N'CN001', N'雀巢香滑咖啡饮料', CAST(1.99 AS Decimal(18, 2)), CAST(2.70 AS Decimal(18, 2)), 3, CAST(0xA85B0000 AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0006', N'Sup003', N'CN001', N'雀巢听装咖啡', CAST(84.21 AS Decimal(18, 2)), CAST(113.70 AS Decimal(18, 2)), 6, CAST(0xA8D80000 AS SmallDateTime), 18)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0007', N'Sup004', N'CN002', N'夏士莲丝质柔顺洗发水', CAST(25.85 AS Decimal(18, 2)), CAST(35.70 AS Decimal(18, 2)), 30, CAST(0xA89D0000 AS SmallDateTime), 36)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0008', N'Sup005', N'CN002', N'飞逸清新爽洁洗发水', CAST(20.47 AS Decimal(18, 2)), CAST(30.00 AS Decimal(18, 2)), 50, CAST(0xA89E0000 AS SmallDateTime), 36)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0009', N'Sup005', N'CN002', N'力士柔亮洗发水（中/干）', CAST(22.65 AS Decimal(18, 2)), CAST(32.30 AS Decimal(18, 2)), 20, CAST(0xA8430000 AS SmallDateTime), 36)
INSERT [dbo].[Goods] ([GoodsNO], [SupplierNO], [CategoryNO], [GoodsName], [InPrice], [SalePrice], [Number], [ProductTime], [QGPeriod]) VALUES (N'GN0010', N'Sup005', N'CN002', N'风影去屑洗发水(清爽)', CAST(22.98 AS Decimal(18, 2)), CAST(34.20 AS Decimal(18, 2)), 6, CAST(0xA8050000 AS SmallDateTime), 36)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'S01', CAST(0x0000A8FA00000000 AS DateTime), 3)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'S02', CAST(0x0000A8D500000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'S03', CAST(0x0000A8BB00000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0001', N'S06', CAST(0x0000A8FD00000000 AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0002', N'S02', CAST(0x0000A8DA00000000 AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0002', N'S05', CAST(0x0000A90B00000000 AS DateTime), 3)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0002', N'S06', CAST(0x0000A90100000000 AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'S01', CAST(0x0000A91900000000 AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'S02', CAST(0x0000A91700000000 AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'S05', CAST(0x0000A8F200000000 AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0003', N'S06', CAST(0x0000A91000000000 AS DateTime), 2)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0005', N'S05', CAST(0x0000A8FC00000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0006', N'S03', CAST(0x0000A8D900000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0007', N'S01', CAST(0x0000A8FA00000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0007', N'S04', CAST(0x0000A8F900000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0007', N'S05', CAST(0x0000A8FA00000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0008', N'S02', CAST(0x0000A8F500000000 AS DateTime), 1)
INSERT [dbo].[SaleBill] ([GoodsNO], [SNO], [HappenTime], [Number]) VALUES (N'GN0008', N'S06', CAST(0x0000A90B00000000 AS DateTime), 1)
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S01', N'李明', 2001, N'男', N'CS', N'IT', N'wx001')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S02', N'徐好', 2000, N'女', N'CS', N'IT', N'wx002')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S03', N'伍民', 1998, N'男', N'CS', N'MIS', N'wx003')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S04', N'闵红', 1999, N'女', N'ACC', N'AC', N'wx004')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S05', N'张小红', 1999, N'女', N'ACC', N'AC', N'wx005')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S06', N'张舒', 2001, N'男', N'CS', N'MIS', N'wx006')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S07', N'王民为', 1999, N'男', N'CS', N'MIS', N'wx007')
INSERT [dbo].[Student] ([SNO], [SName], [BirthYear], [Ssex], [college], [Major], [WeiXin]) VALUES (N'S08', N'李士任', 2001, N'男', N'ACC', N'AC', N'wx008')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup001', N'卡夫食品(中国）有限公司广州分公司', N'广州佛山', N'12348768900')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup002', N'东莞市南城久润食品贸易部', N'广州东莞', N'13248768901')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup003', N'重庆飞鹤食品贸易公司', N'重庆解放碑', N'12648768901')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup004', N'重庆南山日化品贸易公司', N'重庆南坪', N'11648768903')
INSERT [dbo].[Supplier] ([SupplierNO], [SupplierName], [Address], [Telephone]) VALUES (N'Sup005', N'重庆缙云日化品贸易公司', N'重庆北碚', N'19648768903')
INSERT [dbo].[薪资表] ([薪级编号], [薪级名称], [基础薪资], [应发薪资], [实发薪资]) VALUES (N'001', N'1         ', CAST(200.00 AS Numeric(8, 2)), CAST(300.00 AS Numeric(8, 2)), CAST(400.00 AS Numeric(8, 2)))
