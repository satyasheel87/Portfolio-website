Agar tum .git delete kar doge aur baad me phir se GitHub se connect karna chaho, to dubara repo initialize karna padega.

`Project folder me ye commands chalani hongi:`

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/satyasheel87/Portfolio-website.git
git push -u origin main

`Agar GitHub repo me pehle se files hongi, to shayad force push karna pade:`

git push -f origin main


`Lekin better ye hoga ki Git disconnect na karo, bas VS Code me M aur yellow marks hide kar do. Fir jab chaho normal:`

git add .
git commit -m "update"
git push