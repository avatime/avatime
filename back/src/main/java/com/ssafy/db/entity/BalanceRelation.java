package com.ssafy.db.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BalanceRelation extends BaseEntity{
    
    @ManyToOne(cascade = CascadeType.ALL)
    private Balance balance;
    
    @Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
    @JsonProperty("meetingroom_id")
    private Long meetingRoomId;
    
    @Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
    @JsonProperty("user_id")
    private Long userId;
    
    @Column(nullable = false)
    private boolean result;


}