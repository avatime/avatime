package com.ssafy.api.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.print.DocFlavor.STRING;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdatePostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
//		user.setUserId(userRegisterInfo.getId());
//		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
//		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		
		user.setSocialId(userRegisterInfo.getSocialId());
		user.setSocialType(userRegisterInfo.getSocialType());
		user.setName(userRegisterInfo.getName());
		user.setProfileId(userRegisterInfo.getProfileId());
		user.setDescription(userRegisterInfo.getDescription());
		user.setGender(userRegisterInfo.getGender());
		
		return userRepository.save(user);
	}

	@Override
	public User getUserBySocialIdAndSocialType(String socialId, int socialType) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		try {			
			User user = userRepository.findBySocialIdAndSocialType(socialId.trim(), socialType).get();
			return user;
		} catch(NoSuchElementException e) {
			return null;
		}
	}
	
	@Override
	public User getUserByUserName(String name) {
		// 디비에 유저 정보 조회 (name을 통한 조회).
		User user = userRepositorySupport.findUserByUserName(name).get();
		return user;
	}
	
	@Override
	public User getUserByUserId(Long userId) {
		// 디비에 유저 정보 조회 (userId를 통한 조회).
		User user;
		try {
			user = userRepositorySupport.findUserByUserId(userId).get();
		}catch (NoSuchElementException e) {
            user = null;
        }
//		User user = userRepository.findById(userId).get();
		return user;
	}
	
	// 아이디 중복체크
	@Override
	public boolean checkNameDuplicate(String name) {
		boolean response;
		response = userRepository.existsByName(name);
		System.out.println("response: " + response);
		return response;
	}
	
	// 유저 정보 수정
	@Override
	public User updateUserInfo(Long userId, UserUpdatePostReq updateInfo) {
		Optional<User> user = userRepository.findById(userId);
		if (!user.isPresent()) {
			throw new EntityNotFoundException("존재하지 않는 회원입니다.");
		}
		User newUserInfo = user.get();
		newUserInfo.setName(updateInfo.getName());
		newUserInfo.setProfileId(updateInfo.getProfileId());
		newUserInfo.setDescription(updateInfo.getDescription());
		
		return userRepository.save(newUserInfo);
	}
	
	// 유저 정보 삭제
	@Override
	public void deleteUserInfo(Long userId) {
		userRepository.deleteById(userId);
		
	}
	
	// 카카오 토큰 받기
	@Override
	public String getKaKaoAccessToken(String code){
        String access_Token="";
        String refresh_Token ="";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=6300198dbbef93aac1c88f68eeb4525a"); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:8080/api/v1/auth/kakao"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        }catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }
	
	// 카카오 유저 정보 가져오기
	@Override
	public String createKakaoUser(String token) throws Exception {

        String reqURL = "https://kapi.kakao.com/v2/user/me";
        String line = "";
        String result = "";
        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            while ((line = br.readLine()) != null) {
                result += line;
            }

//            br.close();
    
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
	
	@Override
	public ResponseEntity<String> requestProfile(HttpEntity request) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                request,
                String.class
        );
    }
	
	@Override
	public HttpEntity<MultiValueMap<String, String>> generateProfileRequest(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+ accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        return new HttpEntity<>(headers);
    }
	
	@Override
	public String extractAccessToken(String accessTokenResponse) {
		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(accessTokenResponse);
		
		return element.getAsJsonObject().get("access_token").getAsString();
	}
	
	@Override
	public ResponseEntity<String> requestAccessToken(HttpEntity request){
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.exchange(
				"https://nid.naver.com/oauth2.0/token",
				HttpMethod.POST,
				request,
				String.class
				);
	}
	
	@Override
	public HttpEntity<MultiValueMap<String, String>> generateAuthCodeRequest(String code, String state) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
		
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", "UZzm3q6_v7QsL_RHeEgn");
		params.add("client_secret", "6Zwhqfzb61");
		params.add("redirect_uri", "http://localhost:8080/api/v1/auth/naver");
		params.add("code", code);

		return new HttpEntity<>(params, headers);
	}
		
}
