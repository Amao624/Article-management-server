/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50527
 Source Host           : localhost:3306
 Source Schema         : community

 Target Server Type    : MySQL
 Target Server Version : 50527
 File Encoding         : 65001

 Date: 05/05/2022 21:51:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_cate
-- ----------------------------
DROP TABLE IF EXISTS `article_cate`;
CREATE TABLE `article_cate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `alias` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_delete` tinyint(1) NULL DEFAULT 0 COMMENT '0表示存在，1表示删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of article_cate
-- ----------------------------
INSERT INTO `article_cate` VALUES (1, '语文', 'YuWen', 0);
INSERT INTO `article_cate` VALUES (2, '音乐', 'YinYue', 0);
INSERT INTO `article_cate` VALUES (3, '体育', 'TiYu', 0);
INSERT INTO `article_cate` VALUES (4, '地理', 'DiLi', 0);
INSERT INTO `article_cate` VALUES (5, '化学', 'HuaXue', 0);
INSERT INTO `article_cate` VALUES (6, '物理', 'WuLi', 0);
INSERT INTO `article_cate` VALUES (7, 'C语言', 'C', 0);
INSERT INTO `article_cate` VALUES (8, 'PhP', 'PhP', 1);
INSERT INTO `article_cate` VALUES (9, 'Java', 'Java', 0);
INSERT INTO `article_cate` VALUES (10, 'JavaScript', 'JS', 0);
INSERT INTO `article_cate` VALUES (11, '英语', 'English', 0);
INSERT INTO `article_cate` VALUES (12, '电路', 'DianLu', 1);
INSERT INTO `article_cate` VALUES (13, '英语四级', 'CET4', 0);
INSERT INTO `article_cate` VALUES (14, '英语六级', 'CET6', 0);
INSERT INTO `article_cate` VALUES (15, 'PHP', 'PHP', 0);
INSERT INTO `article_cate` VALUES (16, '电路', '电路', 1);
INSERT INTO `article_cate` VALUES (17, '卧槽', '艹', 1);
INSERT INTO `article_cate` VALUES (18, '尼玛222', '牛马', 1);
INSERT INTO `article_cate` VALUES (19, '测试', 'test', 0);
INSERT INTO `article_cate` VALUES (20, '测试1', 'test2', 0);
INSERT INTO `article_cate` VALUES (21, '测试3', 'test3', 0);
INSERT INTO `article_cate` VALUES (22, '测试00', 'test00', 0);
INSERT INTO `article_cate` VALUES (23, '测试c', '测试', 0);
INSERT INTO `article_cate` VALUES (24, '阿玛尼', '我操了', 0);
INSERT INTO `article_cate` VALUES (25, '操蛋', '艹蛋', 1);
INSERT INTO `article_cate` VALUES (26, '你好', '世界', 1);

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cover_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pub_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '已发布',
  `is_delete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0表示没有删除，1删除',
  `cate_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (1, '英语四级', '英语四级', '', '2022-04-24 15:24:21', '已发布', 0, 1, 1);
INSERT INTO `articles` VALUES (2, '数学', '数学家', '', '伊藤清 ', '已发布', 0, 2, 2);
INSERT INTO `articles` VALUES (3, '物理', '物理家', '', '托尼Tuoni', '已发布', 0, 3, 3);
INSERT INTO `articles` VALUES (4, '英语六级', '英语六级', '', '小郭413', '已发布', 0, 4, 4);
INSERT INTO `articles` VALUES (5, 'JavaScript', '第 1 章\r\n什么是 JavaScript \r\n\r\n', '', '[美]马特 • 弗里斯比', '已发布', 0, 5, 5);
INSERT INTO `articles` VALUES (6, '最后版本+路由', '最终测试版本，加了路由的版本', '\\uploads\\87327cb7f40050fa47d378274fd41fd1', '2022-04-25 17:34:33', '已发布', 0, 3, 5);
INSERT INTO `articles` VALUES (7, '数字乱码', '34234234', '\\uploads\\5fec44e86cc1fd2a4795e8c072c7ef1b', '2022-05-01 19:21:00', '已发布', 1, 8, 2);
INSERT INTO `articles` VALUES (8, '还是测试', '测试文章', NULL, '2022-05-01 20:05:48', '已发布', 1, 21, 2);
INSERT INTO `articles` VALUES (9, '口红推荐', '一，阿玛尼口红品牌介绍！ 阿玛尼是意大利的知名奢侈品品牌，，在1975年创立，，阿玛尼口红是其中的一个彩妆系列，阿玛尼旗下，经营着男装女装，眼镜皮具，包包等等，在全球100多个国家均有销售，系列分为阿玛尼红管，阿玛尼黑管，阿玛尼小胖丁，阿玛尼哑光口红，阿玛尼唇膏笔！ 二，阿玛尼唇釉最火色号推荐！', NULL, '2022-05-01 20:06:45', '已发布', 1, 24, 2);
INSERT INTO `articles` VALUES (10, '语文', '我还是写了东西的', NULL, '2022-05-05 15:54:11', '已发布', 0, 3, 2);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '索引',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户密码',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `user_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (1, 'king', 'admin', 'i am king', 'king@qq.com', NULL);
INSERT INTO `userinfo` VALUES (2, 'zhangyu', '$2a$10$PMH0wnxORLYTHbxmCi424.7yQ1b/kOfTAubI2To28i75sfiwoF9.e', 'zhangyu', 'zhangyu@qq.com', '');
INSERT INTO `userinfo` VALUES (3, 'chenjun', '$2a$10$l2RQym2u.9ZSuJWT3aQPduBTIUXgOL7RUzKpNHOYQKsAD.cDpeCfG', '大姐大', '123456@qq.com', NULL);
INSERT INTO `userinfo` VALUES (4, 'liubing', '$2a$10$1o28LInCPLlj5BKPrHlsGOK6A5b6ZmeLOuRbAmG62t8NjxeAeYKka', '干饭王', 'liubing@qq.com', NULL);
INSERT INTO `userinfo` VALUES (5, 'admin1', '$2a$10$id/my7wo3g1F2ATuHL.OquC2WiKxRNFiwSqkwT/k/etfHbArBtlii', '傻逼管理员', 'admin1@qq.com', NULL);
INSERT INTO `userinfo` VALUES (6, 'Amao', '$2a$10$PVnb7FZR66hMd9VACRAec.rIfO1ZmR3P1HnwIS2XV3tr23bf72Vmm', '大哥大', 'Amao123@163.com', NULL);
INSERT INTO `userinfo` VALUES (7, 'test1', '$2a$10$1x5exgI9rInKfs2AehSNU.iOnNh7VIE0R5ZSvoD4/OJywRBFKym/2', '测试员一号', 'test@qq.com', NULL);

SET FOREIGN_KEY_CHECKS = 1;
