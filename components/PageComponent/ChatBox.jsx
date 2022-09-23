import React, { createRef, useEffect, useState } from "react";
import Navbar from "../Navbar";
import Siderbar from "../Siderbar";
import ChatInput from "./ChatInput";
import { auth } from "../../config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { rsa, crypt } from "../../config/hybrid.config";
import parse from "html-react-parser";
const ChatBox = ({ messages, id, loading }) => {
  const [user] = useAuthState(auth);
  const [scrool, setScrool] = useState();
  const messagesEndRef = createRef();
  const [publicKey, setPublicKey] = React.useState(`-----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAkNfJVmtrtWGU355mLWqq
    vVtCPZDlhhNfJs7UruB6HRH8HFz+MKC4rPmLDVJcia0OxMQoQqfHx/zgqxWHz05H
    fgftQij3Z93mJVC+fYsdBo0nSsBSdIOIghMH0ov+KXeI48sWL7eD9HPyVSlkUVta
    ljzwdkcFmSB+QK7F6gMUXF2It/D5dQ0H7tb1U5tX8SAh6TWuscsNytNkh7BK+up6
    t8UKAD7r01EzKXgSyjst6xxkmV2ebEvR038OgFcgR5klyNH3MCtOuwUu5PPpbhej
    gNz3EfzOnsz/4BiHLlytoJIzeB8cf5z7RltBI3RSW7klvJIK5JHz3P9X9S9iJpLv
    1z2Vh6ltAISftCoVmN5eyW7aeP3NqvbzhzSzW/xfU9BQKqVRifNTfnQ5I345Uh8H
    N7JYqz0n3y3LzPmFikFDeXAXmEU+vwSA52EgwiOaviNHZyAUzy3GUOPhE/qQQbeB
    vM50m3wMtd7Mknw1iPXRqC/gJMqCFtALf6GWDeGMIcjHpNP+axouyh01rqkVdfAu
    9x8JA9ftiYgAoA8cG8xYSDadU1gBzrzNsutQ2J7kxxiqgJf1JLIexfuxksXHqRWr
    O/igAREjrTdaITx8RjjHqrvNNxOo96qcKK9uhu1x3xfmgqKew2Zmn8QYIJSlLtuz
    TobBeqA3kQFgHPs+n3ry9bkCAwEAAQ==
    -----END PUBLIC KEY-----`);
  const [privateKey, setPrivateKey] =
    React.useState(`-----BEGIN RSA PRIVATE KEY-----
    MIIJKAIBAAKCAgEAkNfJVmtrtWGU355mLWqqvVtCPZDlhhNfJs7UruB6HRH8HFz+
    MKC4rPmLDVJcia0OxMQoQqfHx/zgqxWHz05HfgftQij3Z93mJVC+fYsdBo0nSsBS
    dIOIghMH0ov+KXeI48sWL7eD9HPyVSlkUVtaljzwdkcFmSB+QK7F6gMUXF2It/D5
    dQ0H7tb1U5tX8SAh6TWuscsNytNkh7BK+up6t8UKAD7r01EzKXgSyjst6xxkmV2e
    bEvR038OgFcgR5klyNH3MCtOuwUu5PPpbhejgNz3EfzOnsz/4BiHLlytoJIzeB8c
    f5z7RltBI3RSW7klvJIK5JHz3P9X9S9iJpLv1z2Vh6ltAISftCoVmN5eyW7aeP3N
    qvbzhzSzW/xfU9BQKqVRifNTfnQ5I345Uh8HN7JYqz0n3y3LzPmFikFDeXAXmEU+
    vwSA52EgwiOaviNHZyAUzy3GUOPhE/qQQbeBvM50m3wMtd7Mknw1iPXRqC/gJMqC
    FtALf6GWDeGMIcjHpNP+axouyh01rqkVdfAu9x8JA9ftiYgAoA8cG8xYSDadU1gB
    zrzNsutQ2J7kxxiqgJf1JLIexfuxksXHqRWrO/igAREjrTdaITx8RjjHqrvNNxOo
    96qcKK9uhu1x3xfmgqKew2Zmn8QYIJSlLtuzTobBeqA3kQFgHPs+n3ry9bkCAwEA
    AQKCAgAGFZp2j+KhZuz7C8tdAwsTEz9QGMMbg7rOhYe3pORcTkIZ6uoentHDKmRl
    9dy/R87EAz1xt1yUERJa/XeMBMzKBYk460GhUlf1n1OxMGPSv6Ez6apNDK1yUVxV
    wt21XjkY4JIZBQt8/FXkr+1v4XeHsh2jyk345b2H+A+GSgTT8HXqzCueeCKqLMt3
    bKIgFep2wnOJMm9s4r5pWMV9jtYC3DsUUZBUeye8CTg42I2QP8wWCTG7eN/ik4bH
    a2GGwG8u5WsN0fPntUsIARsALewHYMDcN5NyZkglYMJk9y2v/hQ9aokm7zA6/2BY
    He3LvpZQOo5Mlbj5wpwuR4RG/IsonlcLYJaKGSOh7nT0kZCdjAoo9DQ5ZVFYKvDi
    Vdqi5sX3LrdLKtAnY1b6NAm2TauzO7TIyMCEh0BijT3B0dn9EIMEXcmBN6mcfagG
    is8bGQBel2pra5nna+ggmOeMI7UCdCDo2V00NMiLYTpf0cTIc3Zjjdw5scvHFSaJ
    R52yU+rpq+zXKQhFeBnnRusFuOXdHYjCfX+zlVqTZD12H2AEWoI6BE2u2PicY7BB
    D2N/ZXRbIbMBSDPJYU4d+ycNgAco7no1uai3gMllz+EnPVFBAIRIyZVPhuOLmaLc
    eijsSml/n87YMWSHRJQ9mKKCGG1BxmUxJyzM7heJWxG2JYc4gQKCAQEAwWOr7kUb
    jNnNJkTiBbvPLNCMzc/w6ITWvoAlZbEzY1tp2rJW4lQXCSufmHzsU/YR3LqFrIaA
    VJRCE8mmpP5ps28cs0CSqXkZ9zoH5bhLRE03s+4+8aK7WBNJuJvqLOzjrrhlM7AW
    zlRVTv/6FSiNJY5jHfDXUDjjXTxZRcehH+HaA5pXKCHYw1j8Teh48CyhXa1a/NSj
    tFepeWrTGVJxTa1FX7XuFqATR2UxBHC1L/tXepSP0MMiGhglQDr/AVNC6xZ/bcwG
    4L9z+5qRzmIgivgF09qaqtUqo3zfieggoUbyikazOvqseIkBPk6eXnTZUuwUZhSX
    BKmlRSSVkYE+6QKCAQEAv7yIKu/Z1slt7y6hmKSMSJNExcfUggrd0GUfdWSAchU1
    5RRgh0AbHvQUH2WzH/dOP0CNwZuUPvSbw2RhXltLNCRbIpp89j7uTpt7BjdzI9bL
    SvPOcWRNfzMCO/1bm/TkLUcj8DPukk5g59yn4OIuRCx3WjL/hUPiBAmCMas29HnG
    1J7uqycGtDaVFME/N0iKcX3goB/FdhkKCWKUx6dLYHfdAhaUnaxtfbwpE/BS6brq
    b0nNBtOK28mpqSlKepIYVMEAlLOxuquLkMNJP3uMcZ6sGcOoxFmvLLnxUECE9vfm
    RJA6jP5Y7DKU4zUdAJr2rRhM/impd+FjGrXGqIDeUQKCAQEAlnRf77jOTU+pvos6
    uTE7Zmc+FGUhzRSEKaNy9OHe0/7rpNy4oc7AOT86JB2Uk2HO1cY7d1URBDxwCAsL
    XjQcsh/Q2Vh0gesYm3IHcN5nmFTm8FJ7n+x2Cni/EyQiFR+bp3QIMCVgKNgNoq+d
    tdZdsYlMbZ/RM7V+liv8XECKh05kGgd6pVtn09soN8iURm7CgCn9rtQUJJtK246T
    e5DbW45heawF9o5FUXdVolm5bQIDNffcx5L4tgpw+L6tZC+N0W4oZ5ijBTmOF4JS
    y5kmLlf12LOrPxsm2BivpQ/2SuLykUed61XY1tHoKLxrk5se9Nd8q0p7j4IYdWmX
    /6Lo+QKCAQAThE5cCIQlD+Xn1dhPIFjDPnJeq4OfJRoFD3YPTgahFjWhNtzIh6b7
    FJ9Dvudn1pWZbKnBTmPdsKp2Ti53G1XhXd4E/LLBohBB4iO4s0Y+HKwe2ghmlG4r
    B3cvwg9kJZ5gWYB3/+FF9UJ594UDKCLLf7c6cDyARTOpc4pUIfh7FDZACFmFBHjz
    OScdsLoNl424FbcatYE1D0FtSSKZ3BaZIDpX7xJ7pkSS6udHh0v5TLR2VY3QJxJY
    YwOpG3HgXiSp4+d6O3xY4wNW3foDw0C9hAhCqx7vta1WIStGHvsp5HwE+KVtGqrU
    iCWNpydnm16GqhWUPYtpj4C2BFDPcCaxAoIBAHLEKGRvL04D+Ng3tCLu2ZocahVl
    8OhMaePjUpk4dWi+MHIq2vVX6KYiRzt1ZSM4CmPC+EqPZbH6RdU7grMoIV2q+3AG
    tyqwNUNvM1MoebIvhdyWfy//E8rJ5qYTW7TG17aN8GfU7Y5rs3L/t+LtAm3vyY3J
    9XHYvmZh/d4SigtG88l/0H1jUGiI5xMNg9E13apvJqyxoQ0g+UIEz+XqHKyKbzyj
    1s6vPX+pyajM1MHV+pfY/XK28uNNndg6NQBym195+CZE4/liP+NBlPcC1gPaMfj0
    QDgzXQAUcM8fEOTFGVp8ggDMjgLUKZqJBPLSa2lVNBs3+zYM5a1RCUu/MTE=
    -----END RSA PRIVATE KEY-----`);
  // React.useEffect(() => {
  //     rsa.generateKeyPair(function (keyPair) {
  //         setPublicKey(keyPair.publicKey);
  //         setPrivateKey(keyPair.privateKey);
  //         console.log(keyPair.publicKey);
  //         console.log(keyPair.privateKey);
  //     });
  // }, []);

  const decrypt = (message) => {
    return crypt.decrypt(privateKey, message).message;
  };

  const scrollToBottom = () => {
    if (messages) {
      messagesEndRef?.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  const getMessages = () => {
    return messages?.map((item, index) => {
      const sender = item.sender == user.email;
      return (
        <>
          <li
            key={index}
            className={sender ? "flex justify-end" : "flex justify-start"}
          >
            <div className="relative  flex ">
              {!sender && (
                <div className="mr-2">
                  <img src={item.avatar} className="h-6 w-6 object-cover rounded-full" />
                </div>
              )}

              <div className="px-4  py-2 block relative max-w-sm text-gray-700 bg-gray-200 rounded shadow">
                {parse(decrypt(item.encryptedMessage))}
              </div>
              {sender && (
                <div className="ml-2">
                  <img src={item.avatar} className="h-6 w-6 object-cover  rounded-full" />
                </div>
              )}
            </div>
          </li>
        </>
      );
    });
  };
  return (
    <>
      <div className="max-w-5xl border border-white m-auto">
        <Navbar />
        <div className="flex">
          <Siderbar />
          <div
            style={{
              backgroundImage: `url("/login-bg.png")`,
              backgroundSize: "400px",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
            className="w-10/12 h-[500px] border-l border-white relative"
          >
            <div className="container mx-auto">
              <div className="w-full relative">
                {messages ? (
                  <>
                    <div className="relative w-full p-6 overflow-y-auto h-[445px]">
                      <ul className="space-y-2">{getMessages()}</ul>
                      <div
                        style={{ float: "left", clear: "both" }}
                        ref={(el) => {
                          messagesEndRef = el;
                        }}
                      ></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center items-center h-[445px]">
                      <span className="text-gray-300">
                        Please select a box chat.
                      </span>
                    </div>
                  </>
                )}
              </div>
              {!loading && messages && (
                <ChatInput
                  id={id}
                  publicKey={publicKey}
                  privateKey={privateKey}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
