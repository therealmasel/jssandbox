package com.smaslov.websockettest;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketHandler;

public class MassyWebSocketHandler extends WebSocketHandler {

	private final Set<MassyWebSocket> websockets = 
			new CopyOnWriteArraySet<MassyWebSocket>();
	@Override
	public WebSocket doWebSocketConnect(
	    HttpServletRequest arg0, 
	    String arg1
	) {
	
		return new MassyWebSocket();
	}

	private class MassyWebSocket implements WebSocket.OnTextMessage{

		private Connection connection;
		
		@Override
		public void onClose(int arg0, String arg1) {
			websockets.remove(this);
		}

		@Override
		public void onOpen(Connection arg0) {
			this.connection = arg0;
			websockets.add(this);
		}

		@Override
		public void onMessage(String arg0) {
			try {
				for (MassyWebSocket socket : websockets) {
			    	socket.connection.sendMessage(arg0);
			    }
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
	}
}

