package tech.yko.syncplayer.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import tech.yko.syncplayer.entity.ControlEvent;
import tech.yko.syncplayer.util.SseMessengerList;

import java.util.UUID;

@RestController
@RequestMapping("/control")
@Slf4j
public class RemoconApiController {

    @Autowired
    SseMessengerList sseList;

    @PostMapping("/")
    public String control(@RequestParam("eventType") String eventType,
                          @RequestParam("currentTime")String currentTime){

        log.info("event = " + eventType + ", " + currentTime);

        for (SseEmitter emitter : sseList.get()){
            try {
                emitter.send(
                        SseEmitter.event()
                                .id(UUID.randomUUID().toString())
                                .name(eventType)
                                .data(currentTime)
                );
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return "success";
    }


}
