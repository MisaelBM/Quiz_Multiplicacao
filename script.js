const punctuationSound = new Audio("short-success-sound-glockenspiel-treasure-video-game-6346.mp3");
const erroSound = new Audio("error-126627.mp3");
document.getElementById("buttonPlay").addEventListener('click', () => {
    document.getElementById("mainHome").style.display = "none";
    document.getElementById("mainGame").style.display = "flex";
    StartGame();
});
let heart;
let punctuation;
let systemResponse;
function StartGame() {
    GenerateQuest();
    heart = 3;
    punctuation = 0;
    document.getElementById("punctuationSpan").innerHTML = punctuation;
};
let lastQuest;
function GenerateQuest() {
    let numberPrincipal = parseInt(Math.random() * (501 - 1) + 1);
    let multiplierNumber = parseInt(Math.random() * (11 - 2) + 2);
    while (lastQuest == numberPrincipal) {
        numberPrincipal = parseInt(Math.random() * (501 - 1) + 1);
    };
    systemResponse = numberPrincipal * multiplierNumber;
    let arrResponse = [];
    function NotResponse() {
        let notRes;
        let typeNotRes = parseInt(Math.random() * 2);
        typeNotRes == 0 ? notRes = parseInt(Math.random() * (systemResponse - (systemResponse / 2)) + (systemResponse / 2)) : notRes = parseInt(Math.random() * ((systemResponse + systemResponse / 2) - (systemResponse + 1)) + (systemResponse + 1));
        while (arrResponse.indexOf(notRes) > -1) {
            typeNotRes == 0 ? notRes = parseInt(Math.random() * (systemResponse - (systemResponse / 2)) + (systemResponse / 2)) : notRes = parseInt(Math.random() * ((systemResponse + systemResponse / 2) - (systemResponse + 1)) + (systemResponse + 1));
        };
        return notRes;
    };
    while (arrResponse.length < 3) {
        arrResponse.length < 2 ? arrResponse.push(NotResponse()) : arrResponse.push(systemResponse);
    };
    function RandomArr(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const randomNumber = parseInt(Math.random() * (i + 1));
            [arr[i], arr[randomNumber]] = [arr[randomNumber], arr[i]];
        };
        return arr;
    };
    arrResponse = RandomArr(arrResponse);
    document.getElementById("spanQuest").innerHTML = `
        <div class="quiz-content">
            <div class="quest" id="quest">
                ${numberPrincipal} X ${multiplierNumber} é?
            </div>
            <div class="button-response-content">
                <div class="button-response-div">
                    <i class="fa-solid fa-a letter"></i> <div class="button-response" data-value="${arrResponse[0]}">${arrResponse[0]}</div>
                </div>
                <div class="button-response-div">
                    <i class="fa-solid fa-b letter"></i> <div class="button-response" data-value="${arrResponse[1]}">${arrResponse[1]}</div>
                </div>
                <div class="button-response-div">
                    <i class="fa-solid fa-c letter"></i> <div class="button-response" data-value="${arrResponse[2]}">${arrResponse[2]}</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("blockClick").style.display = "none";
    document.querySelectorAll(".button-response-div").forEach(e => {
        let valueButton = e.childNodes[3];
        valueButton = valueButton.dataset.value;
        e.addEventListener('click', () => UserResponse(parseInt(valueButton)));
    });
};
function UserResponse(valueResponse) {
    document.getElementById("blockClick").style.display = "flex";
    systemResponse == valueResponse ? NextQuest(true) : LoseHeart();
};
function NextQuest(right) {
    if (right) {
        document.getElementById("quest").style.animation = "anim-right-quest 1s ease";
        punctuationSound.play();
        setTimeout(
            function () {
                document.getElementById("quest").style.removeProperty("animation");
                punctuation++;
                document.getElementById("punctuationSpan").innerHTML = punctuation;
                GenerateQuest();
            }
        ,1000);
    } else {
        GenerateQuest();
    };
};
function LoseHeart() {
    heart--;
    erroSound.play();
    document.getElementById("quest").style.animation = "anim-erro-quest 1s ease";
    document.getElementById(`heart${heart + 1}`).style.animation = "anim-heart-lose 1s ease";
    document.getElementById(`heart${heart + 1}`).style.color = "rgb(49, 49, 49)";
    setTimeout(
        function () {
            document.getElementById("quest").style.removeProperty("animation");
            document.getElementById(`heart${heart + 1}`).style.removeProperty("animation");
            heart == 0 ? FinishGame() : NextQuest(false);
        }
    ,1000);
};
function FinishGame() {
    document.getElementById("endGame").style.display = "flex";
    document.getElementById("endPunctuation").innerHTML = `${punctuation} perguntas`;
    setTimeout(
        function () {
            document.getElementById("endGame").style.display = "none";
            document.getElementById("mainHome").style.display = "flex";
            document.getElementById("mainGame").style.display = "none";
            document.getElementById("blockClick").style.display = "none";
            for (let i = 1; i < 4; i++) {
                document.getElementById(`heart${i}`).style.color = "red";
            };
        }
    ,5000);
};