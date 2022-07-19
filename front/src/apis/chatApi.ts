import { ChatRes } from "./response/chatRes";
interface ChatApi {
  receive: () => Promise<Array<ChatRes>>;
}

const chatApi: ChatApi = {
  receive: function (): Promise<ChatRes[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            profilePath:
              "https://t1.daumcdn.net/cfile/tistory/99CD68345C51B61F0C",
            name: "사용자1",
            message: "11111",
            time: "2022-07-18 17:52",
          },
          {
            profilePath:
              "https://t1.daumcdn.net/cfile/tistory/99CD68345C51B61F0C",
            name: "사용자1",
            message: "22222",
            time: "2022-07-18 17:52",
          },
          {
            profilePath:
              "https://t1.daumcdn.net/cfile/tistory/99CD68345C51B61F0C",
            name: "사용자1",
            message: "33333",
            time: "2022-07-18 17:52",
          },
          {
            profilePath:
              "https://t1.daumcdn.net/cfile/tistory/99CD68345C51B61F0C",
            name: "사용자1",
            message: "44444",
            time: "2022-07-18 17:53",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhbxmeSbCg_TRgelzrSOZY9kNj-UTTyytMvg&usqp=CAU",
            name: "사용자2",
            message: "방가방가 하이룽",
            time: "2022-07-18 17:53",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhbxmeSbCg_TRgelzrSOZY9kNj-UTTyytMvg&usqp=CAU",
            name: "사용자2",
            message: "방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽방가방가 하이룽",
            time: "2022-07-18 17:53",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGZ91smVwdKqm1k0i7Um92FpitAyCY-MvOA&usqp=CAU",
            name: "나",
            message: "하이~",
            time: "2022-07-18 17:54",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGZ91smVwdKqm1k0i7Um92FpitAyCY-MvOA&usqp=CAU",
            name: "나",
            message: "하이~",
            time: "2022-07-18 17:54",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGZ91smVwdKqm1k0i7Um92FpitAyCY-MvOA&usqp=CAU",
            name: "나",
            message: "하이~",
            time: "2022-07-18 17:54",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGZ91smVwdKqm1k0i7Um92FpitAyCY-MvOA&usqp=CAU",
            name: "나",
            message: "하이~",
            time: "2022-07-18 17:54",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGZ91smVwdKqm1k0i7Um92FpitAyCY-MvOA&usqp=CAU",
            name: "나",
            message: "하이~",
            time: "2022-07-18 17:54",
          },
          {
            profilePath:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGZ91smVwdKqm1k0i7Um92FpitAyCY-MvOA&usqp=CAU",
            name: "나",
            message: "하이~",
            time: "2022-07-18 17:54",
          },
          
        ]);
      }, 500);
    });
  },
};

export default chatApi;
