package tech.yko.syncplayer.util;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author ykonno-server
 * @since 2019/02/12
 */
@Component
@Slf4j
public class SseMessengerList {

    List sseList = new ArrayList<SseEmitter>();

    public List<SseEmitter> get(){
        log.info("現在の接続数 = " + sseList.size());
        return sseList;
    }

}
