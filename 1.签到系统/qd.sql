/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : qd

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 07/12/2023 15:53:32
*/

create DATABASE qd;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for initiator
-- ----------------------------
DROP TABLE IF EXISTS `initiator`;
CREATE TABLE `initiator`  (
  `initiator_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发起者id',
  `initiator_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发起者名称',
  `initiator_account` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发起者账户',
  `initiator_password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发起者密码',
  PRIMARY KEY (`initiator_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of initiator
-- ----------------------------
INSERT INTO `initiator` VALUES ('1', '张老师', 'admin', 'admin');

-- ----------------------------
-- Table structure for sgroup
-- ----------------------------
DROP TABLE IF EXISTS `sgroup`;
CREATE TABLE `sgroup`  (
  `group_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '群组序号',
  `group_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '群组名称',
  `initiator_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发起者序号',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sgroup
-- ----------------------------
INSERT INTO `sgroup` VALUES ('1', '计信2109', '1');
INSERT INTO `sgroup` VALUES ('2', '计算2110', '1');

-- ----------------------------
-- Table structure for sign
-- ----------------------------
DROP TABLE IF EXISTS `sign`;
CREATE TABLE `sign`  (
  `sign_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '签到序号',
  `sign_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '签到码',
  `initiator_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发起者序号',
  `group_id` int NULL DEFAULT NULL,
  `isFinsh` int NULL DEFAULT NULL COMMENT '1表示结束，0表示进行',
  `create_at` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `last_at` timestamp NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`sign_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sign
-- ----------------------------
INSERT INTO `sign` VALUES ('1701533432281', NULL, '1', 1, 0, '2023-12-03 00:10:32', NULL);
INSERT INTO `sign` VALUES ('1701533477209', NULL, '1', 1, 1, '2023-12-03 00:11:17', '2023-12-03 00:11:20');
INSERT INTO `sign` VALUES ('1701570545563', NULL, '1', 1, 0, '2023-12-03 10:29:05', NULL);
INSERT INTO `sign` VALUES ('1701570794553', NULL, '1', 1, 0, '2023-12-03 10:33:14', NULL);
INSERT INTO `sign` VALUES ('1701570959313', NULL, '1', 1, 1, '2023-12-03 10:35:59', '2023-12-03 10:36:02');
INSERT INTO `sign` VALUES ('1701571039427', NULL, '1', 1, 0, '2023-12-03 10:37:19', NULL);
INSERT INTO `sign` VALUES ('1701586408482', NULL, '1', 1, 0, '2023-12-03 14:53:28', NULL);
INSERT INTO `sign` VALUES ('1701589412568', NULL, '1', 1, 0, '2023-12-03 15:43:32', NULL);
INSERT INTO `sign` VALUES ('1701589505495', NULL, '1', 1, 0, '2023-12-03 15:45:05', NULL);
INSERT INTO `sign` VALUES ('1701589570289', NULL, '1', 1, 0, '2023-12-03 15:46:10', NULL);
INSERT INTO `sign` VALUES ('1701589710738', 'AIQUMI', '1', 1, 0, '2023-12-03 15:48:30', '2023-12-03 15:48:49');
INSERT INTO `sign` VALUES ('1701591194970', 'ISQW3J', '1', 1, 0, '2023-12-03 16:13:14', NULL);
INSERT INTO `sign` VALUES ('1701591302103', '4XX4J5', '1', 1, 0, '2023-12-03 16:15:02', NULL);
INSERT INTO `sign` VALUES ('1701591338505', 'RHBW3T', '1', 1, 0, '2023-12-03 16:15:38', NULL);
INSERT INTO `sign` VALUES ('1701591482919', '8HVARF', '1', 1, 0, '2023-12-03 16:18:02', NULL);
INSERT INTO `sign` VALUES ('1701591540055', 'TZPVGT', '1', 1, 0, '2023-12-03 16:19:00', NULL);
INSERT INTO `sign` VALUES ('1701591748302', 'IHGWSO', '1', 1, 0, '2023-12-03 16:22:28', NULL);
INSERT INTO `sign` VALUES ('1701591777087', 'ZMZ3W5', '1', 1, 0, '2023-12-03 16:22:57', NULL);
INSERT INTO `sign` VALUES ('1701592149812', 'ZALY9L', '1', 1, 0, '2023-12-03 16:29:09', NULL);
INSERT INTO `sign` VALUES ('1701592186302', 'DZF3NQ', '1', 1, 0, '2023-12-03 16:29:46', NULL);
INSERT INTO `sign` VALUES ('1701592547099', 'S3EE2A', '1', 1, 0, '2023-12-03 16:35:47', NULL);
INSERT INTO `sign` VALUES ('1701592630836', '15WFYB', '1', 1, 0, '2023-12-03 16:37:10', NULL);
INSERT INTO `sign` VALUES ('1701592702392', 'HS1174', '1', 1, 0, '2023-12-03 16:38:22', NULL);
INSERT INTO `sign` VALUES ('1701592845361', '0GL22R', '1', 1, 0, '2023-12-03 16:40:45', NULL);
INSERT INTO `sign` VALUES ('1701593025662', '1C4ZHZ', '1', 1, 0, '2023-12-03 16:43:45', NULL);
INSERT INTO `sign` VALUES ('1701593068908', 'YDJMPQ', '1', 1, 0, '2023-12-03 16:44:28', NULL);
INSERT INTO `sign` VALUES ('1701594086072', '8RJMHJ', '1', 1, 0, '2023-12-03 17:01:26', NULL);
INSERT INTO `sign` VALUES ('1701594452558', 'M0EF34', '1', 1, 0, '2023-12-03 17:07:32', NULL);
INSERT INTO `sign` VALUES ('1701594566132', 'MNYVJK', '1', 1, 0, '2023-12-03 17:09:26', NULL);
INSERT INTO `sign` VALUES ('1701594669442', 'QHSXYL', '1', 1, 0, '2023-12-03 17:11:09', NULL);
INSERT INTO `sign` VALUES ('1701595331070', 'YS1TNJ', '1', 1, 0, '2023-12-03 17:22:11', NULL);
INSERT INTO `sign` VALUES ('1701665285477', 'L52R8K', '1', 1, 0, '2023-12-04 12:48:05', NULL);
INSERT INTO `sign` VALUES ('1701679272275', 'ML1FJJ', '1', 1, 0, '2023-12-04 16:41:12', NULL);
INSERT INTO `sign` VALUES ('1701679562160', 'SVFLX4', '1', 1, 1, '2023-12-04 16:46:02', '2023-12-04 16:51:20');
INSERT INTO `sign` VALUES ('1701679881250', 'Z8NUQM', '1', 1, 1, '2023-12-04 16:51:21', '2023-12-04 16:52:17');
INSERT INTO `sign` VALUES ('1701679938874', 'XKBO6M', '1', 1, 1, '2023-12-04 16:52:18', '2023-12-04 16:53:09');
INSERT INTO `sign` VALUES ('1701679990648', '89T7YN', '1', 1, 1, '2023-12-04 16:53:10', '2023-12-04 16:54:16');
INSERT INTO `sign` VALUES ('1701680057739', '7Y38UA', '1', 1, 1, '2023-12-04 16:54:17', '2023-12-04 16:54:20');
INSERT INTO `sign` VALUES ('1701680062082', '4NRYXZ', '1', 2, 1, '2023-12-04 16:54:22', '2023-12-04 17:04:02');
INSERT INTO `sign` VALUES ('1701680685840', '1GGG2M', '1', 1, 0, '2023-12-04 17:04:45', NULL);
INSERT INTO `sign` VALUES ('1701680818044', 'ULZVOY', '1', 1, 0, '2023-12-04 17:06:58', NULL);
INSERT INTO `sign` VALUES ('1701680860315', 'EUP991', '1', 1, 0, '2023-12-04 17:07:40', NULL);
INSERT INTO `sign` VALUES ('1701680883507', '0A2JK7', '1', 1, 0, '2023-12-04 17:08:03', NULL);
INSERT INTO `sign` VALUES ('1701923812249', 'VHR2S3', '1', 1, 0, '2023-12-07 12:36:52', NULL);
INSERT INTO `sign` VALUES ('1701924146872', 'HB7BIF', '1', 1, 1, '2023-12-07 12:42:26', '2023-12-07 12:42:28');
INSERT INTO `sign` VALUES ('1701934896466', '7P8VGZ', '1', 1, 0, '2023-12-07 15:41:36', NULL);
INSERT INTO `sign` VALUES ('1701935076213', 'Y6711T', '1', 2, 0, '2023-12-07 15:44:36', NULL);
INSERT INTO `sign` VALUES ('1701935102298', 'YADJQE', '1', 1, 0, '2023-12-07 15:45:02', NULL);
INSERT INTO `sign` VALUES ('1701935344996', 'GEOMKU', '1', 1, 1, '2023-12-07 15:49:04', '2023-12-07 15:50:15');
INSERT INTO `sign` VALUES ('1701935417690', 'DG7ZSI', '1', 2, 1, '2023-12-07 15:50:17', '2023-12-07 15:50:47');

-- ----------------------------
-- Table structure for sign_user
-- ----------------------------
DROP TABLE IF EXISTS `sign_user`;
CREATE TABLE `sign_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户序号',
  `sign_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '签到序号',
  `now_user_mac` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '签到用户设备mac',
  `sign_time` datetime NULL DEFAULT NULL COMMENT '签到时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sign_user
-- ----------------------------
INSERT INTO `sign_user` VALUES (1, '1', '1701592186302', NULL, '2023-12-03 16:44:31');
INSERT INTO `sign_user` VALUES (2, '1', '1701593068908', NULL, '2023-12-03 17:01:29');
INSERT INTO `sign_user` VALUES (3, '1', '1701593068908', NULL, '2023-12-03 17:07:39');
INSERT INTO `sign_user` VALUES (4, '1', '1701595331070', NULL, '2023-12-03 23:48:06');
INSERT INTO `sign_user` VALUES (5, '1', '1701595331070', NULL, '2023-12-03 23:48:07');
INSERT INTO `sign_user` VALUES (6, '1', '1701595331070', NULL, '2023-12-04 12:48:10');
INSERT INTO `sign_user` VALUES (7, '1', '1701595331070', NULL, '2023-12-04 12:49:23');
INSERT INTO `sign_user` VALUES (8, '1', '1701595331070', NULL, '2023-12-04 12:49:26');
INSERT INTO `sign_user` VALUES (9, '1', '1701595331070', NULL, '2023-12-04 12:50:14');
INSERT INTO `sign_user` VALUES (10, '1', '1701595331070', NULL, '2023-12-04 16:41:18');
INSERT INTO `sign_user` VALUES (11, '1', '1701595331070', NULL, '2023-12-04 16:45:22');
INSERT INTO `sign_user` VALUES (12, '1', '1701595331070', NULL, '2023-12-04 16:45:34');
INSERT INTO `sign_user` VALUES (13, '1', '1701595331070', NULL, '2023-12-04 16:45:37');
INSERT INTO `sign_user` VALUES (14, '1', '1701679562160', NULL, '2023-12-04 16:50:25');
INSERT INTO `sign_user` VALUES (15, '1', '1701679881250', NULL, '2023-12-04 16:51:33');
INSERT INTO `sign_user` VALUES (16, '1', '1701679938874', NULL, '2023-12-04 16:52:27');
INSERT INTO `sign_user` VALUES (17, '1', '1701679990648', NULL, '2023-12-04 16:53:21');
INSERT INTO `sign_user` VALUES (18, '1', '1701680062082', NULL, '2023-12-04 16:54:31');
INSERT INTO `sign_user` VALUES (19, '1', '1701680685840', NULL, '2023-12-04 17:05:01');
INSERT INTO `sign_user` VALUES (20, '1', '1701680818044', NULL, '2023-12-04 17:07:09');
INSERT INTO `sign_user` VALUES (21, '1', '1701680860315', NULL, '2023-12-04 17:07:48');
INSERT INTO `sign_user` VALUES (22, '1', '1701680883507', NULL, '2023-12-04 17:08:09');
INSERT INTO `sign_user` VALUES (23, '20232160A0934', '1701934896466', NULL, '2023-12-07 15:43:10');
INSERT INTO `sign_user` VALUES (24, '20232160A0934', '1701935102298', NULL, '2023-12-07 15:45:13');
INSERT INTO `sign_user` VALUES (25, '1', '1701935344996', NULL, '2023-12-07 15:49:59');
INSERT INTO `sign_user` VALUES (26, '1', '1701935417690', NULL, '2023-12-07 15:50:26');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `user_mac` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'mac地址',
  `user_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `user_account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户账户',
  `user_password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户密码',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', NULL, '张三', 'zs', '123456');

SET FOREIGN_KEY_CHECKS = 1;
