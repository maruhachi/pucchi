package tech.yko.syncplayer.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import tech.yko.syncplayer.util.SseMessengerList;

@Controller
@RequestMapping("/sync")
@Slf4j
public class SyncController {

    @Autowired
    SseMessengerList messengerList;

    @GetMapping("/")
    public SseEmitter serval() {
        log.info("わたしはサーバル！");

        // タイムアウト値は最長マックスで
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        // SSE送信先を蓄積
        messengerList.get().add(emitter);

        return emitter;
    }
}