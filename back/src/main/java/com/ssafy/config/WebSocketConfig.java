package com.ssafy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import com.ssafy.api.service.handler.ChattingHandler;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	  @Override
	    public void registerStompEndpoints(StompEndpointRegistry registry) {
	        registry.addEndpoint("/stomp/chat")
	                .setAllowedOrigins("http://localhost:8080")
	                .withSockJS();
	    }

	    /*어플리케이션 내부에서 사용할 path를 지정할 수 있음*/
	    @Override
	    public void configureMessageBroker(MessageBrokerRegistry registry) {
	        registry.setApplicationDestinationPrefixes("/pub");
	        registry.enableSimpleBroker("/sub");
	    }

    @Bean
    public WebSocketHandler myHandler(){
		return new ChattingHandler();
    }
    
    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer(){
        // WebSocket의 런타임 특성 제어
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(8192);
        container.setMaxBinaryMessageBufferSize(8192);
        return container;
    }
}
