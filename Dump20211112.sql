-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: onlineshop
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `shopping_cart_id` int NOT NULL,
  `Item_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `shopping_cart_id` (`shopping_cart_id`),
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (186,1,2,20,'2021-11-11 12:04:48'),(187,9,1,20,'2021-11-11 12:04:50'),(188,11,1,20,'2021-11-11 12:04:52'),(193,2,2,28,'2021-11-12 19:39:01'),(199,9,1,29,'2021-11-12 22:25:59'),(200,8,2,29,'2021-11-12 22:33:00'),(203,2,2,30,'2021-11-12 23:05:43');
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Milk & Eggs'),(2,'Vegetables & fruits'),(3,'Meat & Fish'),(4,'Wine & Drinks');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shopping_cart_id` int NOT NULL,
  `final_price` varchar(45) NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `payment_last_digits` int NOT NULL,
  `delivery_city` varchar(45) NOT NULL,
  `delivery_street` varchar(45) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (42,23548468,20,'12.99','2021-11-11',1548,'paris','shanel str5','2021-11-09 23:44:21'),(43,23548468,20,'47.98','2021-11-16',2165,'paris','shanel str5','2021-11-10 00:19:08'),(44,23548468,20,'11.97','2021-11-16',5314,'paris','shanel str5','2021-11-10 00:20:07'),(45,23548468,20,'37','2021-11-22',6532,'paris','shanel str5','2021-11-10 00:20:45'),(46,23548468,20,'17.490000000000002','2021-11-11',5746,'paris','shanel str5','2021-11-10 00:21:58'),(47,23548468,20,'65.98','2021-11-25',3548,'paris','shanel str5','2021-11-10 00:23:14'),(48,23548468,20,'286.5','2021-11-11',4687,'paris','shanel str5','2021-11-10 00:24:08'),(49,23548468,20,'28.5','2021-11-16',1548,'paris','shanel str5','2021-11-10 00:25:14'),(50,23548468,20,'11.97','2021-11-16',2148,'paris','shanel str5','2021-11-10 00:26:15'),(51,23548468,20,'17.700000000000003','2021-11-17',8469,'paris','shanel str5','2021-11-10 00:27:27'),(52,23548468,20,'56.98','2021-11-12',4654,'paris','shanel str5','2021-11-11 09:46:01'),(53,468465135,27,'200.7','2021-11-22',6548,'Ashkelon','vaitsman 15','2021-11-11 11:28:12'),(54,456465484,29,'37','2021-11-22',5498,'Ashdod','sokolov 55','2021-11-12 18:17:31'),(55,456465484,29,'148.7','2021-11-15',8612,'Ashdod','sokolov 55','2021-11-12 19:01:36'),(56,465484648,30,'136.8','2021-11-16',8468,'Ashdod','mang 12','2021-11-12 21:05:18');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `picture` varchar(45) NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Pasteurized Milk 3%','8.50','cheese.png',1),(2,'Shoko Yotveta','4.50','shoko.png',1),(4,'Yoplait Coconut Diet','3.99','Yoplait.png',1),(5,'Iced Coffee 1.2% strong','10.50','Coffee.png',1),(6,'Iced Coffee 1.6% Refined','9.50','xoff.png',1),(7,'Camembert Cheese','32.99','camCheese.png',1),(8,'Quark Creamy Soft Cheese 5%','23.99','Creamycheesee.png',1),(9,'Hard Cheese Emek Sliced 15%','18.50','HardCheese.png',1),(10,'Gilboa Cheese 22%','29.50','giboa.png',1),(11,'Eggs M Omega 3','12.99','Eggs.png',1),(12,'Eggs L Omega 3','13.99','eggsL.png',1),(13,'Brocoli','13.50','broccoli.png',2),(14,'Orange','5.90','orange.png',2),(15,'Avocado','15.50','avocado.png',2),(16,'Apple','3.90','applestar.png',2),(17,'Kiwi','17.50','kiwi.png',2),(18,'Ananas','25.90','ananas.png',2),(19,'Pear','15.90','pear.png',2),(20,'Packed White Potatoes','5.50','potatoes.png',2),(21,'Cherry Tomato Whitney','10.90','whitney.png',2),(22,'Cucumber','7.50','cucumber.png',2),(23,'Dry Onions','5.90','onions.png',2),(24,'Ded Bell Pepper','9.90','pepper.png',2),(25,'Eggplant','7.50','eggplant.png',2),(26,'Cohlrabi','7.90','cohlrabi.png',2),(27,'Actimel Strawberry Yogurt','21.50','aktimel.png',1),(28,'Fresh packed Chicken Thighs','28.90','chicken.png',3),(29,'Fresh packed Chicken chins','33.50','chin.png',3),(30,'Fresh ground beef meat','50.90','meat.png',3),(31,'Fresh Salmon Fillet','90.50','fillet.png',3),(32,'Fresh Antricot','120.50','antricot.png',3),(59,'Petit castel 750ml','120.50','castel.png',4),(60,'Martini','95.5','martini.png',4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `cart_create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`user_id`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,545687845,'2021-10-15 20:44:10'),(2,89988987,'2021-10-15 20:49:17'),(3,899558987,'2021-10-15 20:51:25'),(4,567567557,'2021-10-15 20:52:47'),(5,58898212,'2021-10-15 20:53:18'),(6,8587779,'2021-10-15 20:54:46'),(7,327392411,'2021-10-15 20:56:31'),(8,342612365,'2021-10-15 20:58:17'),(9,97613232,'2021-10-15 21:00:08'),(10,22345855,'2021-10-15 21:01:03'),(11,325473145,'2021-10-15 21:02:33'),(12,325403145,'2021-10-15 21:02:49'),(13,326594565,'2021-10-15 21:04:45'),(14,340663143,'2021-10-15 21:06:44'),(15,783748344,'2021-10-15 21:07:50'),(16,439573523,'2021-10-15 21:10:00'),(17,675756758,'2021-10-15 21:12:27'),(18,686857433,'2021-10-15 21:15:05'),(19,99199919,'2021-10-16 20:15:00'),(20,23548468,'2021-10-16 20:15:00'),(21,499465978,'2021-11-11 00:52:55'),(24,498461215,'2021-11-11 07:17:29'),(25,464684654,'2021-11-11 08:17:26'),(26,684654875,'2021-11-11 08:22:40'),(27,468465135,'2021-11-11 11:26:47'),(28,456484684,'2021-11-12 17:38:32'),(29,456465484,'2021-11-12 17:52:04'),(30,465484648,'2021-11-12 21:04:28');
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8587779,'asrtstz','tsywsy','rosj1111ojishvili@gmail.com','e81cf0d19a622a9849b1f7bbeaa43435','asfafsf','sdtts','CUSTOMER'),(22345855,'JYHFG','HGTF','tuu66u9uk@gmail.com','6910123e0cf8a47b04304cc450459767','KHV','jhfvn','CUSTOMER'),(23548468,'kosta','shanel','shanel@gmail.com','9c22bc7abef4d1b004c3a7449c773b67','paris','shanel str5','ADMIN'),(45657866,'kokokk','kokadsfas','rosjojishvili@gmail.com','8eec0800361f1b9883d99041c693fc05','koko','koko','CUSTOMER'),(58898212,'asdf','asdfa1','koooooli@gmail.com','6910123e0cf8a47b04304cc450459767','asf','asdf','CUSTOMER'),(89988987,'asdf','asdfa','rosjshvili@gmail.com','1e014679de7a3bd5cfd69b6001de9baf','asf','asdf','CUSTOMER'),(97613232,'JYHFG','HGTF','tuu66uuk@gmail.com','6910123e0cf8a47b04304cc450459767','KHV','jhfvn','CUSTOMER'),(99199919,'koasdftd','kaosdfasadgasg','kost19@gmail.com','48beed6a2ea9260957c7b64914941b42','kosttt','kosasss','CUSTOMER'),(165978787,'jobi1','jonreew2','kostakureta2@gmail.com','0f93945d878b456bb759b41c7ffeed1d','NY','broadway st.14','CUSTOMER'),(325403145,'JYHFG','HGTF','tuu690677u9uk@gmail.com','6910123e0cf8a47b04304cc450459767','KHV','jhfvn','CUSTOMER'),(325473145,'JYHFG','HGTF','tuu6677u9uk@gmail.com','6910123e0cf8a47b04304cc450459767','KHV','jhfvn','CUSTOMER'),(326594565,'tuu','tuu','rosjojvaaxishvili@gmail.com','174a7d8e9d59f756b4b543a7e9c1b7cc','tuu','tuu','CUSTOMER'),(327392411,'JYHFG','HGTF','6ggjggj@gmail.com','6910123e0cf8a47b04304cc450459767','KHV','jhfvn','CUSTOMER'),(340663143,'333','333','rosjojishvili33@gmail.com','ef42ffd5ae1c12a72d7c451d9f5e8d6f','333','33','CUSTOMER'),(342612365,'JYHFG','HGTF','tuuuuk@gmail.com','6910123e0cf8a47b04304cc450459767','KHV','jhfvn','CUSTOMER'),(342654084,'konstantin','tedoradze','tedoradze@gmail.com','KOTkot2020','Null','Null','ADMIN'),(439573523,'ggg','gg','ros44joj444ishvili@gmail.com','12c48c3822e1caf8e9532899ad1cefff','ggg','ggg','CUSTOMER'),(456465484,'johne','deppy','user45@gmail.xom','668f09cdfad72c7a4eec852274316463','Ashdod','sokolov 55','CUSTOMER'),(456484684,'george','baiden','user2@gmail.com','668f09cdfad72c7a4eec852274316463','Ashdod','vaitsman 15','CUSTOMER'),(463874547,'kott','kott','ro3sjo223rjishvili@gmail.com','e81cf0d19a622a9849b1f7bbeaa43435','kott','kott','CUSTOMER'),(464684654,'kosta','tedoradzeee','kos@gmail.com','668f09cdfad72c7a4eec852274316463','Ashkelon','sokolov 36','CUSTOMER'),(465484648,'mango','mangooo','cat3@gmail.com','668f09cdfad72c7a4eec852274316463','Ashdod','mang 12','CUSTOMER'),(467874545,'kott','kott','rosjo223jishvili@gmail.com','e81cf0d19a622a9849b1f7bbeaa43435','kott','kott','CUSTOMER'),(467874547,'kott','kott','rosjo223rjishvili@gmail.com','e81cf0d19a622a9849b1f7bbeaa43435','kott','kott','CUSTOMER'),(468465135,'kosta','tedoradze','user9@gmail.com','668f09cdfad72c7a4eec852274316463','Ashkelon','vaitsman 15','CUSTOMER'),(468465512,'sasfsdafee@gm.com','KOTkot456','Ashkelon','ffd4ad1a4a8669d239b07f82eee50e4a','kote','tedoraz','CUSTOMER'),(468468468,'kote','tedoradzzze','sadfkj@dga.com','668f09cdfad72c7a4eec852274316463','Ashkelon','Akaki Tsereteli avenue 93','CUSTOMER'),(498461215,'dgdasgs','dsgsadgdsa','kjdsitj@gmail.com','668f09cdfad72c7a4eec852274316463','Ashdod','asdfasdf','CUSTOMER'),(498468468,'kote12','tedoradzzze','sa2dfkj@dga.com','668f09cdfad72c7a4eec852274316463','Ashkelon','Akaki Tsereteli avenue 93','CUSTOMER'),(498468478,'kote12','tedoradzzze','sa23dfkj@dga.com','668f09cdfad72c7a4eec852274316463','Ashkelon','Akaki Tsereteli avenue 93','CUSTOMER'),(499465578,'kote12','tedoradzzze','sa1kdf@dga.com','668f09cdfad72c7a4eec852274316463','Ashkelon','Akaki Tsereteli avenue 93','CUSTOMER'),(499465978,'kote12','tedoradzzze','sa5kdf@dga.com','668f09cdfad72c7a4eec852274316463','Ashkelon','Akaki Tsereteli avenue 93','CUSTOMER'),(499468478,'kote12','tedoradzzze','sa1kdfkj@dga.com','668f09cdfad72c7a4eec852274316463','Ashkelon','Akaki Tsereteli avenue 93','CUSTOMER'),(545687845,'tukott','kott','rjishvili@gmail.com','e81cf0d19a622a9849b1f7bbeaa43435','kott','kott','CUSTOMER'),(567567557,'asdf','asdfa1','ro52sjshvili@gmail.com','6910123e0cf8a47b04304cc450459767','asf','asdf','CUSTOMER'),(675756758,'jjj','kkk','rosjojish900-ili@gmail.com','80720c4ea96ce398e0e492ff89030c0f','ggg','hhh','CUSTOMER'),(684654875,'kosta','tedorazde','user15@gmail.com','668f09cdfad72c7a4eec852274316463','Herzliya','shinkar 15','CUSTOMER'),(686857433,'fff','rrr','rosjojish8090vili@gmail.com','3c502d893d2624d8c5af4c302b8b6a98','fff','fff','CUSTOMER'),(783748344,'ggg','gg','rosjoj444ishvili@gmail.com','12c48c3822e1caf8e9532899ad1cefff','ggg','ggg','CUSTOMER'),(899558987,'asdf','asdfa1','ro2sjshvili@gmail.com','6910123e0cf8a47b04304cc450459767','asf','asdf','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-12 23:10:01
