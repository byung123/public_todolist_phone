package com.study.todolist.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 외부에서 어떤 요청이 들어오던지 허가해줄건데
                .allowedOriginPatterns("*") // 어떤 오리진을 허가해줄것이냐 -> 근데 *이므로 모든걸 허용해준다는뜻?
                .allowedMethods("*") // 모든 메서드도 허용하겠다
                .allowedHeaders("*") // ㅁ든 헤더도 허가하겠다
                .allowCredentials(true); // 자격증명도 허용하겠다

    }
}
