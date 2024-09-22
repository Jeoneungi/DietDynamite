package com.kh.dd.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class Challenge {
	
	private int userChallengeNo; //개인별 첼린지 번호
	private int userNo; // 작성자번호
	private int challengeNo; // 챌린지타입번호
	private String challengeName; // 챌린지타입번호
	private int challengeResult; // 챌린지 완료 : 1 미완료 : 0
	private char challengeSecession; // 첼린지 활성화여부(N -> 살아있음 Y -> 죽었음)
	private String challengeStartDay; //첼린지 시작일
	private int challengeDays; //첼린지 경과일 -> DB에서 계산
	private int challengeSuccessDays; //첼린지 성공일 -> DB에서 계산
	private int todayResult; // 오늘 챌린지 수행 여부(1 -> 수행, 0 -> 안함)
}
