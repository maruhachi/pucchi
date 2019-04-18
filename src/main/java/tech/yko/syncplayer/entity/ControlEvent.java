package tech.yko.syncplayer.entity;

import lombok.Data;

/**
 * @author ykonno.
 * @since 2019/04/18.
 */
@Data
public class ControlEvent {

    private String eventType;

    private String currentTime;
}
