/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3306
 Source Schema         : pet_manager

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 30/04/2024 17:52:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '内容',
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '时间',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '封面',
  `num` int NULL DEFAULT 0 COMMENT '报名人数',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (6, '爱宠活动 | 共享快乐时光', '亲爱的狗狗爱好者们，我们诚挚邀请您参加我们举办的【欢乐狗狗嘉年华】活动！这将是一场充满乐趣和欢笑的聚会，让您的狗狗们度过一个难忘的时光。\n\n活动当天，您的狗狗将与众多可爱的小伙伴一起参加各类游戏和挑战。我们将设立专业游戏区域，供狗狗们展示智力、灵敏度和协作能力。还有缤纷的美食摊位，提供各种对狗狗友好的美食。\n\n此外，我们准备了精彩的表演节目，包括狗狗才艺秀、时尚模特走秀等等。您将有机会展示您和狗狗的默契和特殊技能。\n\n无论是参与游戏、观看表演，还是与其他狗狗爱好者进行交流和分享，这一天都将充满欢乐和友情。我们相信，通过这次活动，您和您的狗狗将建立更深厚的情感纽带，同时也会结识到更多热爱狗狗的朋友。\n\n让我们一起加入【欢乐狗狗嘉年华】，共享快乐时光，为我们可爱的伙伴们创造美好的回忆吧！', '2023-12-04 13:05:34', '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', 15, '北京市海淀区大海湖');

-- ----------------------------
-- Table structure for adopt
-- ----------------------------
DROP TABLE IF EXISTS `adopt`;
CREATE TABLE `adopt`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `animal_id` int NOT NULL COMMENT '流浪动物id',
  `adopt_status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL COMMENT '领养状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of adopt
-- ----------------------------

-- ----------------------------
-- Table structure for animal
-- ----------------------------
DROP TABLE IF EXISTS `animal`;
CREATE TABLE `animal`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '动物名字',
  `sex` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '动物性别',
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '种类',
  `age` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '年龄',
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '动物照片',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '活动范围',
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '身体状态',
  `sterilization` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '是否绝育',
  `vaccine` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '疫苗接种',
  `adopt` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '领养状态',
  `information` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '其他描述',
  `is_adopt` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '是否被领养',
  `praise` int NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of animal
-- ----------------------------
INSERT INTO `animal` VALUES (1, '猫咪', '公', '猫', '2周岁', '/file/adf6d0a863ca4cf8bf8ac40595b83c93.jpg', '室内', '良好', '是', '已接种', '可领养', '性格温顺', '否', 1);
INSERT INTO `animal` VALUES (2, '柴犬', '公', '狗', '12个月', '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', '室外、室内', '健康', '否', '未接种', '不可领养', '可爱的柴犬', '是', 2);
INSERT INTO `animal` VALUES (3, '呆狗哈士奇', '公', '哈士奇', '12个月', '/file/32f5b5f61910408aa97acdbc056e2d10.jpg', '室内、室外', '健康', '否', '已接种', '可领养', '有点傻', '否', 0);
INSERT INTO `animal` VALUES (4, '胖胖蓝猫', '母', '英国短毛猫', '6个月', '/file/ee49442a3317454a9da737629d1c8895.jpg', '室内', '健康', '否', '已接种', '可领养', '可爱小幼猫', '否', 0);

-- ----------------------------
-- Table structure for applcation
-- ----------------------------
DROP TABLE IF EXISTS `applcation`;
CREATE TABLE `applcation`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '性别',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `experience` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '养宠经验',
  `pet` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '宠物',
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '联系方式',
  `married` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '婚姻',
  `income` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '收入',
  `profession` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '职业',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '住址',
  `reason` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '领养理由',
  `state` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT '待审核' COMMENT '状态',
  `animal_id` int NULL DEFAULT NULL COMMENT '动物id',
  `user_id` int NULL DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of applcation
-- ----------------------------
INSERT INTO `applcation` VALUES (1, '张胜', '男', 29, '无经验', NULL, '15877777777', '未婚', '5000+', '程序员', '广州', '喜欢', '审核不通过', 2, 2);
INSERT INTO `applcation` VALUES (2, '王二', '男', 29, '有经验', NULL, '15877777777', '已婚', '9000+', '私企员工', '广州', '喜欢', '审核通过', 2, 3);

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `user_id` int NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (8, '来看看我家狗狗可爱嘛', '![01.jpg](http://localhost:9311/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg)', 1, '2023-11-25 23:11:31', '管理员');

-- ----------------------------
-- Table structure for article_kp
-- ----------------------------
DROP TABLE IF EXISTS `article_kp`;
CREATE TABLE `article_kp`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '内容',
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '时间',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '封面',
  `read1` int NULL DEFAULT 0 COMMENT '阅读数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article_kp
-- ----------------------------
INSERT INTO `article_kp` VALUES (7, '狗狗：人类最忠实的朋友', '狗狗是人类最受欢迎的宠物之一，被誉为人类最忠实的朋友。它们以各种品种的形式存在，从小型狗到大型犬，从拥有长毛、短毛或无毛的外观，到拥有不同的颜色和花纹。\n\n狗狗是社交性动物，非常喜欢与家人互动和结交新朋友。它们可以成为温柔、忠诚和无条件爱的化身。并且，许多狗狗还能执行各种任务，例如导盲犬、搜救犬和警犬等。\n\n拥有狗狗需要投入时间和精力来满足它们的需求。定期的锻炼、散步和游戏可以保持它们健康和快乐。此外，提供适当的饮食、良好的卫生环境和定期的兽医检查对于维持狗狗的健康也至关重要。\n\n作为宠物主人，我们需要给予狗狗关爱、尊重和培养良好的行为习惯。通过训练和社交化，我们可以帮助它们成为社会上守法、友好和适应各种环境的成员。\n\n与狗狗相处将给我们带来许多快乐、温暖和无尽的爱。无论是健康时还是当它们需要特别关注和护理时，狗狗都会一直陪伴在我们身边。\n\n与狗狗的共处将极大地丰富我们的生活，让我们成为更好的人类。带给它们幸福，我们也将从中获得回报，一起度过美好的时光。', '2023-12-04 13:17:51', '/file/32f5b5f61910408aa97acdbc056e2d10.jpg', 13);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '回复内容',
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '回复人',
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '回复时间',
  `pid` int NULL DEFAULT NULL COMMENT '父id',
  `article_id` int NULL DEFAULT NULL COMMENT '文章id',
  `type` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (9, '可爱', 'user', '2023-11-25 23:17:01', NULL, 8, 2);

-- ----------------------------
-- Table structure for donate
-- ----------------------------
DROP TABLE IF EXISTS `donate`;
CREATE TABLE `donate`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '捐款人',
  `goods` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '捐赠物资',
  `time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '捐款事件',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of donate
-- ----------------------------
INSERT INTO `donate` VALUES (1, '张三', '牛奶', '2023-11-25 22:56:46');

-- ----------------------------
-- Table structure for feed
-- ----------------------------
DROP TABLE IF EXISTS `feed`;
CREATE TABLE `feed`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '环境照片1',
  `img2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '环境照片2',
  `img3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '环境照片3',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '地址',
  `information` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '相关描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of feed
-- ----------------------------
INSERT INTO `feed` VALUES (1, '/file/1c6b1cb486894bd1a91d37b359f97017.jpg', '/file/baf9051740e9477f986d9a9c7b990911.jpg', '/file/453d3c84562d4f6c968c3ebff42fcd99.jpg', '海淀区海南小区', '宠物喂养点');

-- ----------------------------
-- Table structure for lost
-- ----------------------------
DROP TABLE IF EXISTS `lost`;
CREATE TABLE `lost`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '走失宠物名字',
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '种类',
  `sex` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '性别',
  `person` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '联系人',
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '联系方式',
  `status1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '已丢失/带领回',
  `status2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '找回状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of lost
-- ----------------------------
INSERT INTO `lost` VALUES (1, '三毛', '狗', '公', '六六', '15877777777', '已丢失', '未找到');
INSERT INTO `lost` VALUES (2, '小米', '猫', '母', '小明', '15877777777', '已丢失', '未找到');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '内容',
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (3, '给宠物爱好者的一段话', '亲爱的宠物爱好者们，感谢您一直以来对我们宠物管理系统的支持和关注！我们希望通过这个公告向您分享一些重要的信息。  首先，请注意，我们的宠物管理系统已经迎来了一批可爱的小动物等待被您带回家！无论您是寻找一只忠诚的狗狗、一只灵巧的猫咪，或是一只小鸟、小兔子等其他小伙伴，我们都会竭尽全力寻找最适合您的伴侣。每一只待领养的动物都经过详细的健康检查和心理评估，确保它们处于良好的状态。给他们一个温暖的家，也是给自己一份无尽的陪伴和快乐！', '2023-11-25 00:00:00');
INSERT INTO `notice` VALUES (4, '关于领养宠物的寄语', '无论您是孤独需要陪伴，还是充满爱心想要帮助需要的小生命，我们都欢迎您加入我们的宠物领养大家庭！如果您对系统的使用、领养流程等有任何疑问或建议，请随时联系我们的客户服务团队，我们将竭诚为您提供帮助。  再次感谢您的支持与关注！让我们共同为保护和关爱每一只宠物共同努力！', '2023-11-25 00:00:00');
INSERT INTO `notice` VALUES (5, '如果您想要为宠物捐赠物资', '如果您想要为流浪宠物们捐赠物资，请联系负责人: 张三，联系电话: 010-65998877。', NULL);

-- ----------------------------
-- Table structure for rescue
-- ----------------------------
DROP TABLE IF EXISTS `rescue`;
CREATE TABLE `rescue`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `addres` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '地址',
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '照片',
  `person` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '联系人',
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '联系方式',
  `information` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '相关描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rescue
-- ----------------------------
INSERT INTO `rescue` VALUES (1, '救助1号', '北京市海淀区宠物救助中心', '/file/baf9051740e9477f986d9a9c7b990911.jpg', '王五', '15877777777', '中心救助站');

-- ----------------------------
-- Table structure for salvation
-- ----------------------------
DROP TABLE IF EXISTS `salvation`;
CREATE TABLE `salvation`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `information` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '情况描述',
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '现场照片',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '地点',
  `time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '发现时间',
  `person` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '联系人',
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '联系方式',
  `state` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT '未解决' COMMENT '解决状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salvation
-- ----------------------------
INSERT INTO `salvation` VALUES (1, '发现一只疑似走丢的家猫', '/file/bb7940b20bb54131a9e3e50cc25c34a4.jpg', '海淀区人民广场', '2023-11-25 22:50:28', '张三', '15977777777', '未解决');
INSERT INTO `salvation` VALUES (2, '野外小狗无主人', '/file/76b04f48e4a64758b33ecb2fb2f5dcac.jpg', '海淀区博物馆', '2023-11-25 22:50:58', '李四', '13088888888', '未解决');

-- ----------------------------
-- Table structure for sterilization
-- ----------------------------
DROP TABLE IF EXISTS `sterilization`;
CREATE TABLE `sterilization`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `animal_id` int NULL DEFAULT NULL COMMENT '流浪动物id',
  `catch1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '捕捉状态',
  `sterilization` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '绝育状态',
  `release1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '放生状态',
  `vaccine` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL COMMENT '疫苗状态',
  `animal_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sterilization
-- ----------------------------
INSERT INTO `sterilization` VALUES (2, 1, '已捕捉', '是', '未放生', '已接种', '小猫咪');

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '内容',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '类型'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES ('add', 'iconfont icon-r-add', 'icon');
INSERT INTO `sys_dict` VALUES ('edit', 'iconfont icon-r-edit', 'icon');
INSERT INTO `sys_dict` VALUES ('delete', 'iconfont icon-r-delete', 'icon');
INSERT INTO `sys_dict` VALUES ('find', 'iconfont icon-r-find', 'icon');
INSERT INTO `sys_dict` VALUES ('user1', 'iconfont icon-r-user1', 'icon');
INSERT INTO `sys_dict` VALUES ('user2', 'iconfont icon-r-user2', 'icon');
INSERT INTO `sys_dict` VALUES ('user3', 'iconfont icon-r-user3', 'icon');
INSERT INTO `sys_dict` VALUES ('team', 'iconfont icon-r-team', 'icon');
INSERT INTO `sys_dict` VALUES ('home', 'iconfont icon-r-home', 'icon');
INSERT INTO `sys_dict` VALUES ('buildin', 'iconfont icon-r-building', 'icon');
INSERT INTO `sys_dict` VALUES ('mark1', 'iconfont icon-r-mark1', 'icon');
INSERT INTO `sys_dict` VALUES ('mark2', 'iconfont icon-r-mark2', 'icon');
INSERT INTO `sys_dict` VALUES ('mark3', 'iconfont icon-r-mark3', 'icon');
INSERT INTO `sys_dict` VALUES ('shield', 'iconfont icon-r-shield', 'icon');
INSERT INTO `sys_dict` VALUES ('refresh', 'iconfont icon-r-refresh', 'icon');
INSERT INTO `sys_dict` VALUES ('love', 'iconfont icon-r-love', 'icon');
INSERT INTO `sys_dict` VALUES ('yes', 'iconfont icon-r-yes', 'icon');
INSERT INTO `sys_dict` VALUES ('no', 'iconfont icon-r-no', 'icon');
INSERT INTO `sys_dict` VALUES ('paper', 'iconfont icon-r-paper', 'icon');
INSERT INTO `sys_dict` VALUES ('list', 'iconfont icon-r-list', 'icon');
INSERT INTO `sys_dict` VALUES ('setting', 'iconfont icon-r-setting', 'icon');

-- ----------------------------
-- Table structure for sys_file
-- ----------------------------
DROP TABLE IF EXISTS `sys_file`;
CREATE TABLE `sys_file`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文件名称',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文件类型',
  `size` bigint NULL DEFAULT NULL COMMENT '文件大小(kb)',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '下载链接',
  `md5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文件md5',
  `is_delete` tinyint(1) NULL DEFAULT 0 COMMENT '是否删除',
  `enable` tinyint(1) NULL DEFAULT 1 COMMENT '是否禁用链接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 110 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_file
-- ----------------------------
INSERT INTO `sys_file` VALUES (90, 'logo2.jpg', 'jpg', 635, '/file/d0f1c679738d4481a1aeb5fd45446982.jpg', '96564de9ed610acff96bc60b5d98e375', 0, 1);
INSERT INTO `sys_file` VALUES (91, '04.jpg', 'jpg', 616, '/file/bb7940b20bb54131a9e3e50cc25c34a4.jpg', '09ea457b9b65cb136584e58579859d4d', 0, 1);
INSERT INTO `sys_file` VALUES (92, '03.jpg', 'jpg', 444, '/file/76b04f48e4a64758b33ecb2fb2f5dcac.jpg', '75e3957bd425eb50fb6976614fb71aa5', 0, 1);
INSERT INTO `sys_file` VALUES (93, '03.jpg', 'jpg', 459, '/file/1c6b1cb486894bd1a91d37b359f97017.jpg', '7c1ef6b581f147cdbbff672cc7c4bd3b', 0, 1);
INSERT INTO `sys_file` VALUES (94, '03.jpg', 'jpg', 631, '/file/baf9051740e9477f986d9a9c7b990911.jpg', '02a0c9cdcb7bb5e5869ef70f5b4a2f30', 0, 1);
INSERT INTO `sys_file` VALUES (95, '10.jpg', 'jpg', 382, '/file/453d3c84562d4f6c968c3ebff42fcd99.jpg', 'b80d6f23dee70c86a744238b84a2711b', 0, 1);
INSERT INTO `sys_file` VALUES (96, '01.jpg', 'jpg', 574, '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', '90dd30ec3c6f0165c14a3dcb203f4093', 0, 1);
INSERT INTO `sys_file` VALUES (97, '05.jpg', 'jpg', 472, '/file/adf6d0a863ca4cf8bf8ac40595b83c93.jpg', '0ea6f890816f6df043f6b9f3e0baf93b', 0, 1);
INSERT INTO `sys_file` VALUES (98, '02.jpg', 'jpg', 540, '/file/32f5b5f61910408aa97acdbc056e2d10.jpg', 'd9a02baae4f4ffc9beda40a6419413df', 0, 1);
INSERT INTO `sys_file` VALUES (99, '06.jpg', 'jpg', 583, '/file/ee49442a3317454a9da737629d1c8895.jpg', 'b95d7cd6ef41116f9769cf8ff6c24aef', 0, 1);
INSERT INTO `sys_file` VALUES (100, '03.jpg', 'jpg', 631, '/file/baf9051740e9477f986d9a9c7b990911.jpg', '02a0c9cdcb7bb5e5869ef70f5b4a2f30', 0, 1);
INSERT INTO `sys_file` VALUES (101, '01.jpg', 'jpg', 574, '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', '90dd30ec3c6f0165c14a3dcb203f4093', 0, 1);
INSERT INTO `sys_file` VALUES (102, '02.jpg', 'jpg', 540, '/file/32f5b5f61910408aa97acdbc056e2d10.jpg', 'd9a02baae4f4ffc9beda40a6419413df', 0, 1);
INSERT INTO `sys_file` VALUES (103, '01.jpg', 'jpg', 574, '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', '90dd30ec3c6f0165c14a3dcb203f4093', 0, 1);
INSERT INTO `sys_file` VALUES (104, '01.jpg', 'jpg', 574, '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', '90dd30ec3c6f0165c14a3dcb203f4093', 0, 1);
INSERT INTO `sys_file` VALUES (105, '01.jpg', 'jpg', 574, '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', '90dd30ec3c6f0165c14a3dcb203f4093', 0, 1);
INSERT INTO `sys_file` VALUES (106, '01.jpg', 'jpg', 574, '/file/dd2cfa5daa7a4ca2b82593d21a31b655.jpg', '90dd30ec3c6f0165c14a3dcb203f4093', 0, 1);
INSERT INTO `sys_file` VALUES (107, '01.jpg', 'jpg', 146, '/file/a0455b12998a4d32b280e5f5542bbcc6.jpg', '5c072037e4e9662831fe448e28795770', 0, 1);
INSERT INTO `sys_file` VALUES (108, '01.jpg', 'jpg', 146, '/file/a0455b12998a4d32b280e5f5542bbcc6.jpg', '5c072037e4e9662831fe448e28795770', 0, 1);
INSERT INTO `sys_file` VALUES (109, '01.jpg', 'jpg', 146, '/file/a0455b12998a4d32b280e5f5542bbcc6.jpg', '5c072037e4e9662831fe448e28795770', 0, 1);
INSERT INTO `sys_file` VALUES (110, 'nurse.png', 'png', 1803, '/file/6b9f639c78714303b0fafc58ed11c629.png', '3c266282f4323126e9fd6733caf38b8a', 0, 1);

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '路径',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图标',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '描述',
  `pid` int NULL DEFAULT NULL COMMENT '父级id',
  `page_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '页面路径',
  `sort_num` int NULL DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (4, '系统管理', NULL, 'iconfont icon-r-setting', NULL, NULL, NULL, 300);
INSERT INTO `sys_menu` VALUES (5, '用户管理', '/user', 'iconfont icon-r-user2', NULL, 4, 'User', 301);
INSERT INTO `sys_menu` VALUES (6, '角色管理', '/role', 'iconfont icon-r-user3', NULL, 4, 'Role', 302);
INSERT INTO `sys_menu` VALUES (7, '菜单管理', '/menu', 'iconfont icon-r-setting', NULL, 4, 'Menu', 303);
INSERT INTO `sys_menu` VALUES (8, '文件管理', '/file', 'iconfont icon-r-paper', NULL, 4, 'File', 304);
INSERT INTO `sys_menu` VALUES (10, '主页', '/home', 'iconfont icon-r-home', NULL, NULL, 'Home', 0);
INSERT INTO `sys_menu` VALUES (11, '流浪动物管理', '/animal', 'iconfont icon-r-love', NULL, 25, 'Animal', 401);
INSERT INTO `sys_menu` VALUES (12, '宠物绝育管理', '/sterilization', 'iconfont icon-r-refresh', NULL, 25, 'Sterilization', 402);
INSERT INTO `sys_menu` VALUES (13, '申请领养管理', '/applcation', 'iconfont icon-r-add', NULL, 25, 'Applcation', 407);
INSERT INTO `sys_menu` VALUES (14, '评论管理', '/comment', 'iconfont icon-r-team', NULL, 26, 'Comment', 501);
INSERT INTO `sys_menu` VALUES (15, '流浪动物救助', '/salvation', 'iconfont icon-r-love', NULL, 25, 'Salvation', 403);
INSERT INTO `sys_menu` VALUES (16, '喂养点管理', '/feed', 'iconfont icon-r-building', NULL, 25, 'Feed', 405);
INSERT INTO `sys_menu` VALUES (18, '宠物走失管理', '/lost', 'iconfont icon-r-no', NULL, 25, 'Lost', 404);
INSERT INTO `sys_menu` VALUES (19, '救助站管理', '/rescue', 'iconfont icon-r-building', NULL, 25, 'Rescue', 406);
INSERT INTO `sys_menu` VALUES (20, '帖子管理', '/article', 'iconfont icon-r-edit', NULL, 26, 'Article', 502);
INSERT INTO `sys_menu` VALUES (21, '捐赠管理', '/donate', 'iconfont icon-r-yes', NULL, 26, 'Donate', 503);
INSERT INTO `sys_menu` VALUES (22, '公告管理', '/notice', 'iconfont icon-r-edit', NULL, 4, 'Notice', 305);
INSERT INTO `sys_menu` VALUES (23, '科普文章管理', '/articleKp', 'iconfont icon-r-edit', NULL, 26, 'ArticleKp', 504);
INSERT INTO `sys_menu` VALUES (24, '活动管理', '/activity', 'iconfont icon-r-mark1', NULL, 26, 'Activity', 505);
INSERT INTO `sys_menu` VALUES (25, '宠物管理', NULL, 'iconfont icon-r-love', NULL, NULL, NULL, 400);
INSERT INTO `sys_menu` VALUES (26, '其他管理', NULL, 'iconfont icon-r-list', NULL, NULL, NULL, 500);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '描述',
  `flag` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '唯一标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '管理员', '管理员', 'ROLE_ADMIN');
INSERT INTO `sys_role` VALUES (2, '普通用户', '普通用户', 'ROLE_USER');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` int NOT NULL COMMENT '角色id',
  `menu_id` int NOT NULL COMMENT '菜单id',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '角色菜单关系表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 4);
INSERT INTO `sys_role_menu` VALUES (1, 5);
INSERT INTO `sys_role_menu` VALUES (1, 6);
INSERT INTO `sys_role_menu` VALUES (1, 7);
INSERT INTO `sys_role_menu` VALUES (1, 8);
INSERT INTO `sys_role_menu` VALUES (1, 10);
INSERT INTO `sys_role_menu` VALUES (1, 11);
INSERT INTO `sys_role_menu` VALUES (1, 12);
INSERT INTO `sys_role_menu` VALUES (1, 13);
INSERT INTO `sys_role_menu` VALUES (1, 14);
INSERT INTO `sys_role_menu` VALUES (1, 15);
INSERT INTO `sys_role_menu` VALUES (1, 16);
INSERT INTO `sys_role_menu` VALUES (1, 18);
INSERT INTO `sys_role_menu` VALUES (1, 19);
INSERT INTO `sys_role_menu` VALUES (1, 20);
INSERT INTO `sys_role_menu` VALUES (1, 21);
INSERT INTO `sys_role_menu` VALUES (1, 22);
INSERT INTO `sys_role_menu` VALUES (1, 23);
INSERT INTO `sys_role_menu` VALUES (1, 24);
INSERT INTO `sys_role_menu` VALUES (1, 25);
INSERT INTO `sys_role_menu` VALUES (1, 26);
INSERT INTO `sys_role_menu` VALUES (2, 4);
INSERT INTO `sys_role_menu` VALUES (2, 8);
INSERT INTO `sys_role_menu` VALUES (2, 10);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '密码',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '昵称',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '电话',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '地址',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '角色',
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '性别',
  `birth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '出生年月',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '123456', '管理员', '123@qq.com', '19911111111', '北京市海淀区', '2023-06-22 21:10:27', '/file/6b9f639c78714303b0fafc58ed11c629.png', 'ROLE_ADMIN', '男', '1999-07-01');
INSERT INTO `sys_user` VALUES (4, 'user', '123456', '张三', '155@qq.com', '13544444444', '北京市海淀区', '2023-11-25 22:31:12', '/file/a0455b12998a4d32b280e5f5542bbcc6.jpg', 'ROLE_USER', '男', '2023-11-25');

SET FOREIGN_KEY_CHECKS = 1;
