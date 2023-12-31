
const inp_search = document.getElementById("search_word");
const btn_search = document.getElementById("search_submit");
const pwords = document.getElementsByClassName("word-p")

const box_query = document.getElementById("querybox");

var query_finished = {"syn":true,"ant":true,"partof":true,"jjb":true}

document.addEventListener("DOMContentLoaded",function(){
    box_query.style.display = "none";
    for (let i = 0; i < pwords.length; i++){
        pwords[i].classList.toggle("toggle-anim-p");
    };

    btn_search.addEventListener("click", function(){
        if (inp_search.value == ""){
            return;
        }
        query_finished.syn = false;
        query_finished.ant = false;
        query_finished.partof = false;
        query_finished.jjb = false;
        var text = inp_search.value;
        box_query.style.display = "grid";
        DisableSearchBar(true)
        SetWord(text)
        getSynonyms(text)
        getAntonyms(text)
        getPartOf(text)
        getMeansLike(text)
        for (let i = 0; i < pwords.length; i++){
            pwords[i].classList.toggle("toggle-anim-p");
        };


        if (query_finished.syn && query_finished.ant && query_finished.partof){
            QueryFinished()
        }
    })
    inp_search.addEventListener("keydown", function(event){
        if (inp_search.value == ""){
            return;
        }
        else if (event.key == 'Enter' || event.keyCode == 13){
            query_finished.syn = false;
            query_finished.ant = false;
            query_finished.partof = false;
            query_finished.jjb = false;
            var text = inp_search.value;
            box_query.style.display = "grid";
            DisableSearchBar(true)
            SetWord(text)
            getSynonyms(text)
            getAntonyms(text)
            getPartOf(text)
            getAdjectives(text)
            getMeansLike(text)
            for (let i = 0; i < pwords.length; i++){
                pwords[i].classList.toggle("toggle-anim-p");
            };

            if (query_finished.syn && query_finished.ant && query_finished.partof){
                QueryFinished()
            }
        }
    })
})

function SetWord(text){
    var word = document.getElementById("word-title");
    word.textContent = text;
}

async function getSynonyms(text){
    await fetch(`https://api.datamuse.com/words?rel_syn=${text}`)
    .then(response => response.json())
    .then(response => GetResultsToList("syn", response))
    .catch(err => function(){
        console.error(err);
        DisableSearchBar(false);
    });
    query_finished.syn = true;
}

async function getAntonyms(text){
    await fetch(`https://api.datamuse.com/words?rel_ant=${text}`)
    .then(response => response.json())
    .then(response => GetResultsToList("ant", response))
    .catch(err => console.error(err));
    query_finished.ant = true;
}

async function getPartOf(text){
    await fetch(`https://api.datamuse.com/words?rel_par=${text}`)
    .then(response => response.json())
    .then(response => GetResultsToList("par", response))
    .catch(err => console.error(err));
    query_finished.partof = true;
}

async function getAdjectives(text){
    await fetch(`https://api.datamuse.com/words?rel_jjb=${text}`)
    .then(response => response.json())
    .then(response => GetResultsToList("jjb", response))
    .catch(err => fconsole.error(err));
    query_finished.jjb = true;
}

async function getMeansLike(text){
    await fetch(`https://api.datamuse.com/words?ml=${text}`)
    .then(response => response.json())
    .then(response => GetResultsToList("ml", response))
    .catch(err => console.error(err));
}
//there is no significant use for this function for now...
//thinking for another use besides on query finished
async function QueryFinished(){
    query_finished.syn = false;
    query_finished.ant = false;
    query_finished.partof = false;
    query_finished.jjb = false;

}

async function GetResultsToList(type, response){
    var words = ""
    response.forEach(function(item, index){
        if (index == 0){
            words += item.word
        } else {
            words += ", " + item.word
        }
        
    })
    var get_word_p = document.getElementById(`word-p-${type}`);
    get_word_p.textContent = words;
    get_word_p.classList.toggle("toggle-anim-p");
    DisableSearchBar(false);
    box_query.style.display = "none";

}

function DisableSearchBar(setbool){
    inp_search.disabled = setbool;
    btn_search.disabled = setbool;
}