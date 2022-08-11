package com.ssafy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
<<<<<<< HEAD
        registry.addEndpoint("/ws/ava").setAllowedOriginPatterns("*");
//    	registry.addEndpoint("/ws/ava");
=======
        registry.addEndpoint("/ws/ava").setAllowedOriginPatterns("*").withSockJS();
//        registry.addEndpoint("/ws/ava").setAllowedOriginPatterns("*");
>>>>>>> 1508b83 (fix(build): stomp 버전 업그레이드)
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

    	// queue => 1:1 topic => 1:다
        registry.enableSimpleBroker("/queue", "/topic");

        registry.setApplicationDestinationPrefixes("/app");
    }
}
