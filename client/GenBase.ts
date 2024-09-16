import {v4} from "@std/uuid"

export function PayPoi({phone_number,password,device_uuid,client_uuid,accesstoken}:{phone_number?: string,password?:string,device_uuid?:string,client_uuid?:string,accesstoken?:string}): any {
  let main:any
  main.phone_number = phone_number?.replaceAll("-","").replaceAll(" ","");
  main.device_uuid = device_uuid;
  if (client_uuid&&v4.validate(client_uuid)) {
    main.client_uuid = client_uuid;
  } else {
    main.client_uuid = crypto.randomUUID();
  }
  main.appversion = "4.61.0";
  main.params = {
    "payPayLang":"ja"
  }

  main.headers = {
    "Host": "app4.paypay.ne.jp",
    "Accept-Charset" : "UTF-8",
    "Client-Mode" : "NORMAL",
    "Client-OS-Release-Version" : "16.7.5",
    "Client-OS-Type" : "IOS",
    "Client-OS-Version" : "16.7.5",
    "Client-Type" : "PAYPAYAPP",
    "Client-UUID" : main.client_uuid,
    "Client-Version" : main.appversion,
    "Device-Brand-Name" : "apple",
    "Device-Hardware-Name" : "iPhone10,1",
    "Device-Manufacturer-Name" : "apple",
    "Device-Name" : "iPhone10,1",
    "Device-UUID" : main.device_uuid,
    "Is-Emulator" : "false",
    "Network-Status" : "WIFI",
    "System-Locale" : "ja",
    "Timezone" : "Asia/Tokyo",
    "User-Agent" : `PaypayApp/${main.appversion} iOS16.7.5 Ktor`,
  }
  if (accesstoken){
    main.headers["Authorization"]=`Bearer ${accesstoken}`
    main.access_token=accesstoken
  }
  else if(phone_number){
    main.access_token=null
    main.refresh_token=null
    main.timestamp=null
    main.code_verifier, main.code_challenge = pkce.generate_pkce_pair(43)
    const payload={
        "clientId":"pay2-mobile-app-client",
        "clientAppVersion":main.appversion,
        "clientOsVersion":"16.7.5",
        "clientOsType":"IOS",
        "redirectUri":"paypay://oauth2/callback",
        "responseType":"code",
        "state":pkce.generate_code_verifier(43),
        "codeChallenge":self.code_challenge,
        "codeChallengeMethod":"S256",
        "scope":"REGULAR",
        "tokenVersion":"v2",
        "prompt":"",
        "uiLocales":"ja"
    }
}
}