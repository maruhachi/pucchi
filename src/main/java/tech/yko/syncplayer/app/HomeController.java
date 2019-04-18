package tech.yko.syncplayer.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("player")
    public String player(){
        return "player";
    }

    @GetMapping("/controller")
    public String controller(){

        return "controller";
    }

}
