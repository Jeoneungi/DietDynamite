/*
 * package com.kh.dd.rest;
 * 
 * import java.util.List;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.context.annotation.PropertySource; import
 * org.springframework.web.bind.annotation.GetMapping; import
 * org.springframework.web.bind.annotation.PostMapping; import
 * org.springframework.web.bind.annotation.RequestBody; import
 * org.springframework.web.bind.annotation.RequestMapping; import
 * org.springframework.web.bind.annotation.ResponseBody; import
 * org.springframework.web.bind.annotation.RestController;
 * 
 * import com.kh.dd.model.dto.Place; import com.kh.dd.model.service.MapService;
 * 
 * @RestController
 * 
 * @RequestMapping("/rest/map")
 * 
 * @PropertySource("classpath:spring/app.properties")
 * 
 * public class MapRestController {
 * 
 * @Autowired private MapService service;
 * 
 * // 새로운 장소를 즐겨찾기에 추가
 * 
 * @PostMapping("/places/add") public int addPlace(@RequestBody Place place) {
 * 
 * System.out.println(place); return service.addPlace(place); }
 * 
 * // 즐겨찾기 목록 불러오기 (JSON 형식으로 반환)
 * 
 * @GetMapping("/places/favorites")
 * 
 * @ResponseBody public List<Place> getAllPlaces() {
 * 
 * return service.getAllPlaces(); // 실제 서비스 메소드에서 즐겨찾기 목록만 반환하도록 수정 } }
 * 
 * 
 * 
 * // 새로운 장소를 즐겨찾기에 추가
 * 
 * @GetMapping("/test") public String addImages(String placeId, String placeImg)
 * { System.out.println("test"); System.out.println(placeId);
 * System.out.println(placeImg); return ""; }
 * 
 * }
 */