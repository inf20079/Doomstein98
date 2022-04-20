function socketHandler_init()
{
    const lobbyName = JSON.parse(document.getElementById('json-lobbyname').textContent);
    const userName  = JSON.parse(document.getElementById('json-username').textContent);
    document.title = lobbyName;
    const protocol = window.location.protocol.match(/^https/) ? 'wss' : 'ws'

    const webSocket = new WebSocket(
        protocol
        + '://'
        + window.location.host
        + '/ws/game/'
        + lobbyName
        + '/'
    );

    webSocket.onopen = function(){ 

        console.log('Username:', userName)

        webSocket.send(
            JSON.stringify({
                "type" : "joinLobby",
                "msg"  : {
                    "lobby"    : lobbyName,
                }
            })
        );
        webSocket.send(
            JSON.stringify({
                "type" : "joinGame",
                "msg"  : {
                    "lobby"    : lobbyName,
                }
            })
        );
    }

    webSocket.onmessage = (e) => {

        let data = JSON.parse(e.data)

        playerX     = data['players'][userName]['x'];
        playerY     = data['players'][userName]['y'];
        playerAngle = data['players'][userName]['dir'];

        let rec_bullets = data['bullets'];
        initBullets();
        for (let i = 0; i < rec_bullets.length; i++)
            bullets.push([rec_bullets[i]['x'], rec_bullets[i]['y']]);

        ammo = data['players'][userName]['ammo'];
        health = data['players'][userName]['h'];
        currWeapon = data['players'][userName]['weapon'] | 0;
        weapons = data['palyers'][userName]['weapons'] | 0;

        let mouseDeltaX = lastRecordedMouseX - lastMouseX;
        lastMouseX = lastRecordedMouseX

        //console.log("pointerLocked     : " + pointerLocked)
        //console.log("pointerLockedClick: " + pointerLockedClick)
        //console.log("mouseDeltaX: " + mouseDeltaX)

        let new_idx = false

        // E key
        if(keyStates[69]){
            new_idx = weapons[(weapons.indexOf(currWeapon) + 1)%weapons.length]
        }

        // Q Key
        if(keyStates[81]){
            new_idx = weapons.indexOf(currWeapon) - 1;

            if(new_idx < 0){
                new_idx += weapons.length;
            }
        }

        webSocket.send(JSON.stringify({
            "type" : "loop",
            "msg"  : {
                "up"            : keyStates[87] | false,
                "down"          : keyStates[83] | false,
                "left"          : keyStates[65] | false,
                "right"         : keyStates[68] | false,
                "change"        : new_idx,
                "mouseDeltaX"   : ((mouseDeltaX) ? mouseDeltaX : 0),
                "leftClick"     :  longClicked || shortClicked,
            }
        }));

        if(shortClicked) {
            shortClicked = false;
        }
        
        console.log('Data:', data)
    };

    webSocket.onclose = function(e) {
        console.log('The socket closed unexpectedly')
    };
}