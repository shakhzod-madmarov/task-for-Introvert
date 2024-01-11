import { useState } from "react";
import { Axios } from "axios";

import BtnFetch from "./BtnFetch";

const GettingTask = () => {
  const [status, setStatus] = useState("");

  const secretKey =
    "NsIEtSfOirO09ry77MAKpv9HIziVgGEBfNiu9EbAc4FCFJuvV4YjcJx0cJFj33kS";
  const integrationKey = "853e8c50-5d3e-4e6b-a8b7-f63cf0fd42e5";
  const authorizationKey =
    "def50200b143afe5e6d84073dab3fdff250bfa5a81c22ad332159e74975160c66b4700da6d56f49101e74a3574e18f6261514e42c12a50cd7f5ac1a6319c86c2cf614130e902f459f2737dc49bf9757a5f93b7804e2acd78c93260e953a46d5682c4c5728f4a01b741b1302be74ec4238d96f12ea9c004a5fc52388d0b4964ebaa5d3cce9a2233379b5e3ced7ac0d2fac371d7b98676cec7a230b42376573e3ba3153fee2e865d1380162032b99eec36577e5bac403fe51369d0135b5f136e5afde8f896b3e9ac200ae8dccebc33403636c0817439bd3e047f99489c3d3c337e396495db6693870b4a693025db52d1439fb828e1a3a35f2a6a36dabafc8506e0141373617bbaf00a3acbf9119e2d1625ce17511b344ca7bcd78f8681b07becc0cdb82fad3095b8a2e936299b98a5f55bddf14536ee461e9b21d9e1afae2c1f8385eff52bc33141bf258da8af54288bd1390cb9a3912bf9947c9edaa82c8785aed397ccb604c64c58049a5e35b597447ca864367d4a001fa92da14af3f762c3a76ac7e1f3efbee50a3b900a30c2fc373de575e2e3cc23519b42ee038b5afc62ee7df0cb5f5dc76ece1829b882cf97869c144b11b59019fc966af14f69cb67cb06402ce6cbf81411eb051640634159134a4e598efd685b0546e66ebe191317daeaa6db9363235ab5";

  const fetchData = async () => {
    try {
      const contactsResponse = await Axios.get(
        "https://api.amocrm.ru/v4/contacts?filter[leads]=null",
        {
          headers: {
            Authorization: `Bearer ${authorizationKey}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      const contacts = contactsResponse.data._embedded.contacts;

      for (const contact of contacts) {
        await Axios.post(
          "https://api.amocrm.ru/v4/tasks",
          {
            text: "Контакт без сделок",
            complete_till_at: Math.floor(Date.now() / 1000) + 86400,
            _embedded: {
              entities: [
                {
                  entity_id: contact.id,
                  entity_type: "contacts",
                },
              ],
            },
          },
          {
            headers: {
              Authorization: `Bearer ${authorizationKey}`,
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );
      }

      setStatus("Задачи успешно созданы для контактов без сделок.");
    } catch (error) {
      setStatus("Произошла ошибка при взаимодействии с API amoCRM.");
      console.error("Error:", error);
    }
  };

  return (
    <section>
      <h1>Создатель задач amoCRM</h1>
      <BtnFetch fetchData={fetchData} />
      <div>Status: {status}</div>
    </section>
  );
};

export default GettingTask;
