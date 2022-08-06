package com.ssafy.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

/**
 * 파일 업로드 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "파일 업로드 관련 API", tags = {"File."})
@RestController
@RequestMapping("/api/v1/file")
public class FileController {

}
