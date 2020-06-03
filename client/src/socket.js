import io from "socket.io-client";
import { updateState, getState } from "./storage";

const SOCKET_URL = "http://localhost:3000";

const client = io(SOCKET_URL);

const initMessages = (socket, stateGetter, stateSetter) => () => {
  socket.on("reseive-entities", (entities) =>
    stateSetter({
      entities,
    })
  );

  socket.on("reseive-entity", (entity) => entity &&
    stateSetter({
      entities: {
        ...stateGetter().entities,
        [entity.id]: entity,
      },
    })
  );
};

const updateEntities = (socket) => () => socket.emit("entities");

const updateEntity = (socket) => (id) => socket.emit("entity", { id });

const updateEntitiesWithSocket = updateEntities(client);

const updateEntityWithSocket = updateEntity(client);

export default initMessages(client, getState, updateState);

export { updateEntitiesWithSocket as updateEntities };

export { updateEntityWithSocket as updateEntity}
