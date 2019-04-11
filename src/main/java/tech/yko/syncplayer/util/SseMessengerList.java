package tech.yko.syncplayer.util;

import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author ykonno-server
 * @since 2019/02/12
 */
@Component
public class SseMessengerList {

    List sseList = new ArrayList<SseEmitter>();

    public List<SseEmitter> get(){

        return sseList;
    }

}
