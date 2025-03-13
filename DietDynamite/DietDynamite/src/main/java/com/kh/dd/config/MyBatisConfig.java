package com.kh.dd.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

/** MyBatis 를 위한 설정, 하기 두개의 라이브러리 필요
 * - mybatis, mybatis-spring
 */
@Configuration
public class MyBatisConfig {

	@Autowired
	private DataSource dataSource;

	/** SqlSessionFactory
	 *  - dataSource(DBCP 연결객체) 와 MyBatis 설정을 이용해 sqlSessionFactory 를 만드는 객체
	 * @throws Exception
	 */
	@Bean
	public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource);
		sqlSessionFactory.setConfigLocation(new ClassPathResource("spring/mybatis-config.xml"));	// classpath: �� ��ü�ϴ� ��ü
		
		return sqlSessionFactory.getObject();
	}
	
	/** SqlSessionTemplate
	 *  - sqlSession 객체를 생성하는 객체
	 *  - sqlSession : SQL 구문을 DB에 전달, 실행하는 객체
	 */
    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

	/** DataSourceTransactionManager
	 *  - Spring 에서 @Transactional 애노테이션을 사용할 수 있음 (오류시 롤백기능)
	 *  - servlet-context.xml 에서 "tx:annotation-driven" 을 활성화할것
	 */
    @Bean
    public DataSourceTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource);
    }
}
