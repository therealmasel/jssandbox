package websockettest;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;

public class MassyServer {

	public static void main(String[] args) {
		Server server = new Server (8081);
		MassyBinaryWebSocketHandler socketHandler = new
				MassyBinaryWebSocketHandler();
		socketHandler.setHandler(new DefaultHandler());
		server.setHandler(socketHandler);
		try {
			server.start();
			server.join();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
