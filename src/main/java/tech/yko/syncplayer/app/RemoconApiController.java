package tech.yko.syncplayer.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import tech.yko.syncplayer.util.SseMessengerList;

import java.util.UUID;

@RestController
@RequestMapping("/control")
@Slf4j
public class RemoconApiController {

    @Autowired
    SseMessengerList sseList;

    @GetMapping("/start")
    public String start(@RequestParam("currentTime")String currentTime){

        log.info("event = "  + currentTime);

        for (SseEmitter emitter : sseList.get()){
            try {
                emitter.send(
                        SseEmitter.event()
                                .id(UUID.randomUUID().toString())
                                .name("start")
                                .data(currentTime)
                );
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return "started";
    }

    @GetMapping("/stop")
    public String stop(){

        log.info("call Stop button");

        for (SseEmitter emitter : sseList.get()){
            try {
                emitter.send(
                        SseEmitter.event()
                                .id(UUID.randomUUID().toString())
                                .name("stop")
                );
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return "stoped";
    }
}
