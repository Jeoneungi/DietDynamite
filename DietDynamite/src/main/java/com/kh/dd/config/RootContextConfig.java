package com.kh.dd.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
public class RootContextConfig {
	@Bean(destroyMethod = "close")	// destroyMethod = "close" 종료시 자동 close
	public DataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		// DBCP 연결 설정
		dataSource.setDriverClassName("oracle.jdbc.driver.OracleDriver");
		dataSource.setUrl("jdbc:oracle:thin:@localhost:1521:xe");
		dataSource.setUsername("dynamite");
		dataSource.setPassword("dynamite1234");
		dataSource.setDefaultAutoCommit(false);

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
