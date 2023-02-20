let reposList = async function (apiLink) {
    try {
        let myRequest = await fetch(apiLink);
        return await myRequest.json();
    } catch (rej) {
        return Error(`${rej}`);
    }
};

let theInput = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-button"),
    reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    if (theInput.value === "") {
        reposData.innerHTML = `<span>Please Write Github Username.</span>`;
    } else {
        reposList(`https://api.github.com/users/${theInput.value}/repos`).then(
            (res) => {
                console.log(res);
                reposData.innerHTML = "";
                res.forEach((repo) => {
                    // Create Main Div
                    let mainDiv = document.createElement("div"),
                        repoName = document.createTextNode(repo.name);
                    mainDiv.appendChild(repoName);

                    // Create URL
                    let theURL = document.createElement("a"),
                        urlText = document.createTextNode("Visit");
                    theURL.appendChild(urlText);
                    theURL.href = `https://github.com/${theInput.value}/${repo.name}`;
                    theURL.setAttribute("target", "_blank");
                    mainDiv.appendChild(theURL);

                    // Create Stars Count
                    let starsSpan = document.createElement("span"),
                        starsSpanText = document.createTextNode(
                            `Stars ${repo.stargazers_count}`
                        );
                    starsSpan.appendChild(starsSpanText);
                    mainDiv.appendChild(starsSpan);

                    mainDiv.className = "repo-box";
                    reposData.appendChild(mainDiv);
                });
            }
        );
    }
};
