package com.kh.dd.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
public class RootContextConfig {
	@Bean(destroyMethod = "close")	// destroyMethod = "close" 종료시 자동 close
	public DataSource dataSource() throws ClassNotFoundException {
		BasicDataSource dataSource = new BasicDataSource();
		// DBCP 연결 설정
		dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
		
		// Oracle Wallet을 사용하여 연결 설정
	    dataSource.setUrl("jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCPS)(HOST=adb.ap-chuncheon-1.oraclecloud.com)(PORT=1522)))(CONNECT_DATA=(SERVICE_NAME=g59a3d9a9e02179_dynamite_high.adb.oraclecloud.com)))");
		dataSource.setUsername("admin");
		dataSource.setPassword("Dynamite1234");
		dataSource.setDefaultAutoCommit(false);
		Class.forName("oracle.jdbc.OracleDriver");
		
//		System.setProperty("oracle.net.wallet_location", "/home/ec2-user/wallet");
		System.setProperty("oracle.net.wallet_location", "C:\\Users\\JEG\\Downloads\\Wallet_dynamite");

		// DBCP 설정
		dataSource.setInitialSize(10);
		dataSource.setMaxTotal(500);
		dataSource.setMaxIdle(100);
		dataSource.setMinIdle(10);
		dataSource.setMaxWaitMillis(-1);

		return dataSource;
	}
	
	/** CommonsMultipartResolver
	 *   - commons-fileupload 설정
	 *   - Multipart 설정
	 */
	@Bean
	public CommonsMultipartResolver multipartResolver() {
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		
        multipartResolver.setMaxUploadSize(104857600L); // 100 MB
        multipartResolver.setMaxUploadSizePerFile(104857600L); // 100 MB
        multipartResolver.setMaxInMemorySize(104857600); // 100 MB
        
        return multipartResolver;
	}
}
