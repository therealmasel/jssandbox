package websockettest;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketHandler;
import org.eclipse.jetty.websocket.WebSocket.Connection;


public class MassyBinaryWebSocketHandler extends WebSocketHandler{

    private final Set<MassyBinaryWebSocket> websockets = 
        new CopyOnWriteArraySet<MassyBinaryWebSocket>();
    
    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest arg0, String arg1) {
        return new MassyBinaryWebSocket();
    }

    private class MassyBinaryWebSocket implements WebSocket.OnBinaryMessage{
        private Connection connection;
        
        @Override
        public void onMessage(byte[] arg0, int arg1, int arg2) {
            try {
                for (MassyBinaryWebSocket socket : websockets) {
                    System.out.println("arg1=" + arg1);
                    System.out.println("arg2=" + arg2);
                    for (int i = 0 ; i< arg2; i++) {
                        int v = arg1 + i;
                        System.out.println("arg0[v]=" + arg0[v]);
                        
                        arg0[v] = 12;
                        System.out.println("v=" + v);
                    }
                    
                    socket.connection.sendMessage(arg0, arg1, arg2);
                }
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            
        }

        @Override
        public void onClose(int arg0, String arg1) {
            websockets.remove(this);
        }

        @Override
        public void onOpen(Connection connection) {
            this.connection = connection;
            websockets.add(this);
            
        }
        
    }
}
