import { Injectable } from '@angular/core';
import { ArticleDetail } from '../interfaces/ArticleDetail';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  protected articleList:ArticleDetail[] = [
    {
      id: 0,
      title: "Content Not Found ",
      subtitle: "",
      mainimg: "",
      preview: "Error: Content Not Found.",
      safeHTML: undefined,
      content: "Error: Content Not Found.",
      slug: '404',
      date: new Date('2024-10-11'),
      type: "page"
      },
        {
        id: 1,
        title: "Front Page Content",
        subtitle: "",
        mainimg: "/articles/1/me.jpg",
        preview: "<img src='/articles/1/me.jpg' />This is me.<br /> Despite the picture, I'm not angry at anything.<br />I'm very nice.<br />I promise.<br/>To quote the great philosopher, Ringo Starr: \"It's just me face\".",
        safeHTML: undefined,
        content: "<img class='topimg' src='/articles/1/me.jpg'>This is me.<br/>&nbsp;<br/>Despite the picture, I'm not angry at anything.<br />&nbsp;<br/>I'm very nice.<br />&nbsp;<br/>I promise.<br/>&nbsp;<br/>To quote the great philosopher, Ringo Starr: \"It's just me face\".<br/>&nbsp;<br/>I've been a software developer, creating connected applications since the mid 80's. I've worked with a multitude of languages over the years from cobalt right up to the one I'm currently trying out, Go. The ones I've spent the most time with are C and PHP. I've been working with PHP since version 2 in the 90's. I'm an equally capable sysadmin very familiar with Linux, Windows and all the networking technology they employ.<br />If you've a technology project and you need some help to get it started or pushing it across the finish line head over to the contact page and get in touch.",
        slug: "",
        date: new Date('2024-10-11'),
        type: "page"
      },
      {
        id: 2,
        title: "Learning to code",
        subtitle: "Without tutorials",
        mainimg: "/articles/2/ttt-001.jpg",
        preview: "This is an article about learning to code via tuts and such.",
        safeHTML: undefined,
        content: `
<img class='topimg' src='/articles/2/ttt-001.jpg' /><h2>Tic-Tac-Toe</h2>I recently caught a video from Forrest Knight about learning to code via tutorials and why that's not necessarily a great way to learn. If you have a moment, you should watch the video for yourself (there's a link below) but the gist is this. If you follow a tutorial to build a project, you are being guided through typing the source code for that project. You may, depending on how you learn, pick up some things this way but mostly, your just typing software someone else has written. A better way to learn would be to pick a specific project that uses the technology you want to learn and build it. The example he used was to take simple games like Tic-tac-toe or Hangman and iterate on your solution to improve it. If you'd like to watch the video, you can find it here:<br /><br />
            <a href="https://www.youtube.com/watch?v=8XVI_Zrvz3c">https://www.youtube.com/watch?v=8XVI_Zrvz3c</a>
         </P>
         <p>
            It felt like an interesting project so I thought I'd give it a go and illustrate the sort of things you might learn doing a project like this. In this first installment I built a super basic version of Tic-tac-toe for two players the way I might have early on as a developer.
         </P>
         <p>
            The language I chose for this was C. I wanted to use C because it's available to pretty much everyone and is super well documented and very straight forward to code in. I'll also do a version of this for the web, almost certainly in php. This version will live on my <a href="https://github.com/makeBrooklyn/tictactoe/">GitHub</a> profile.
         </P>
         <h2>Version 1</h2>
         <p>
            I built this first version the way a young developer might go about it. I didn't make any sort of plan or anything. I started out by making, essentially, a hello world program that said something about Tic-tac-toe and expanded that until I had a tic tac toe program so although we'll discus the header file and the global bits and the functions as descrete items, they were built as needed and modified on the fly to get to the end result. The end result in this case being a program that will allow two players sitting at a console to play Tic-tac-toe. It wont let you mark out of turn or mark an square that's already beed used and it detects when the game has been won and ends.
         </p>
         <p>
            Lets start by looking at the bit before the definition of main().
         </p>
            <section class='codeblock'>
<pre class="code_syntax" style="color:#d1d1d1;background:#000000;"><span class="line_wrapper"><span style="color:#9999a9; ">// definitions</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The Software Version</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">define</span><span style="color:#008073; "> __VERSION </span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; ">1.0.0</span><span style="color:#02d045; ">"</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Some things that are different for windows vs nix</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">ifdef</span><span style="color:#008073; "> _WIN32</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The console clear command for windows</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">define</span><span style="color:#008073; "> _CLR_CMD_ </span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; ">cls</span><span style="color:#02d045; ">"</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">else</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The console clear command for linux and most</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// everything else</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">define</span><span style="color:#008073; "> _CLR_CMD_ </span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; ">clear</span><span style="color:#02d045; ">"</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">endif</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Include required for the functions / libraries</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// we are using.</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">include </span><span style="color:#02d045; ">&lt;</span><span style="color:#40015a; ">stdlib.h</span><span style="color:#02d045; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">include </span><span style="color:#02d045; ">&lt;</span><span style="color:#40015a; ">stdio.h</span><span style="color:#02d045; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">include </span><span style="color:#02d045; ">&lt;</span><span style="color:#40015a; ">string.h</span><span style="color:#02d045; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#008073; ">#</span><span style="color:#008073; ">include </span><span style="color:#02d045; ">"</span><span style="color:#40015a; ">ttt.h</span><span style="color:#02d045; ">"</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Global variables</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Player one name</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> pOne<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">128</span><span style="color:#d2cd86; ">]</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Player Two name</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> pTwo<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">128</span><span style="color:#d2cd86; ">]</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Player one marker</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> pOneChar <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'X'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Player two marker</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> pTwoChar <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'O'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The array to hold the board values</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">3</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">3</span><span style="color:#d2cd86; ">]</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Any error messages that need to be displayed</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> error<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">256</span><span style="color:#d2cd86; ">]</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Keep track of whos turn it is</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> turn <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The number of turns taken so far.</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> turns <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The name of the current player</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> player<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">128</span><span style="color:#d2cd86; ">]</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The current marker to use</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> marker <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'X'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The name of the winner</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> winner<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">128</span><span style="color:#d2cd86; ">]</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// The marker of the winner</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">char</span> winnerMark <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'-'</span><span style="color:#b060b0; ">;</span></span></pre>
<span style="color:#ffffff; font-weight:bold; ">Syntax highlighting generated using</span> <a target='_blank' href='https://tohtml.com/c/'>https://tohtml.com/c/</a>
            </section>
         <p>
            The first section is for defining constants and the first one is the version number. It's not used for anything now but its not unreasonable for a beginner to set it for intended later use. Next we check to see what operating system we are using because in this most basic version we'll use the system command to clear the console. For Windows, that would be "cls" but for Linux and Mac it would be "clear". 
         </p>
         <p>
            Next come the includes. In this case they're just the basics: stdlib.h, stdio.h, string.h and the file I've created for this program, ttt.h (We'll go over what’s in there in the next section). A beginner who has learned just the basics would know to include these.
         </p>
         <p>
            The last section covers the definition of global variables. If you are a more experienced developer, you can see that there are a lot of things here that you would most likely do differently. For someone just starting out, this would be a perfectly reasonable way to make sure the variables related to game play are available in all the functions you assume you'll need.
         </p>
         <p>
            <section class='olcontainer'>
               <ol>
                  <li><b>char pOne<[128]</b> - Player one name. A length of 128 should be more than enough.</li>
                  <li><b>char pTwo<[128]</b> - Player Two name. A length of 128 should be more than enough.</li>
                  <li><b>char pOneChar = 'X'</b> - Player one marker. This will be displayed on the board when the player makes a move.</li>
                  <li><b>char pTwoChar = 'O'</b> - Player two marker. This will be displayed on the board when the player makes a move.</li>
                  <li><b>char board[3][3]</b> - The array to hold the board values. Initially it is filled with the square numbers, 1-9, but as the game is played it is filled with the player markers untill the game is won.</li>
                  <li><b>char error[256]</b> - Any error messages that need to be displayed. This will be a potentially longer string so it's given a length of 256.</li>
                  <li><b>char turn = 1</b> - Keep track of who's turn it is</li>
                  <li><b>char player[128]</b> - The name of the current player, either pOne or pTwo.</li>
                  <li><b>char marker</b> = 'X' - The current marker to use, either  pOneChar or pTwoChar.</li>
                  <li><b>char winner[128]</b> - The name of the winner</li>
                  <li><b>char winnerMark</b> = '-' - The marker of the winner</li>
               </ol>
            </section>
         </p>
         <p>
            Once again, these were not all set at once in order. Each was added as needed (or at least perceived need) dictated. In spite of my trying to approach this as a beginner I could not help but think ahead to a point where we would certainly want to have the game use the players’ actual names, elsewise we could just have used constants. Now let’s have a look at what’s in the header file for this program.
         </p>
         <p class='clear'>
            <section class='codeblock'>
            <pre class="code_syntax" style="color:#d1d1d1;background:#000000;"><span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> isMatch<span style="color:#d2cd86; ">(</span><span style="color:#e66170; font-weight:bold; ">char</span> a<span style="color:#d2cd86; ">,</span> <span style="color:#e66170; font-weight:bold; ">char</span> b<span style="color:#d2cd86; ">,</span> <span style="color:#e66170; font-weight:bold; ">char</span> c<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> gameOver<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> squareFill<span style="color:#d2cd86; ">(</span><span style="color:#e66170; font-weight:bold; ">int</span> num<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> renderBoard<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> <span style="color:#e66170; font-weight:bold; ">main</span><span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span></pre>
<span style="color:#ffffff; font-weight:bold; ">Syntax highlighting generated using</span> <a target='_blank' href='https://tohtml.com/c/'>https://tohtml.com/c/</a>               
            </section>
         </p>
         <p>
            In this case, there's not too much there. Just the prototypes for each of the functions created. We will go over each in its own section further along. For now, it’s enough to know that a c beginner would find out pretty quickly that unless all the functions can be written in the .c file in the order in which they are needed and none of them call anything from higher up in the list, you need to prototype your functions. If you do that, you can have them in any order you like.
         </p>
         <p>
            Now let’s go through the definitions of each function. We'll save main for last!
         </p>
         <p>
            <section class='codeblock'>
            <pre class="code_syntax" style="color:#d1d1d1;background:#000000;"><span class="line_wrapper"><span style="color:#9999a9; ">// Function Definitions</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Function:    isMatch(char a, char b, char c)</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Parms:       requires three chars. The three</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              elements in any column, row, or</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              diagonal on a Tic-Tac-Toe board.</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Return:      Returns a 1 (true) if a winner</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              has been detected. It also sets</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              the winner name and mark for</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              later display</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> isMatch<span style="color:#d2cd86; ">(</span><span style="color:#e66170; font-weight:bold; ">char</span> a<span style="color:#d2cd86; ">,</span> <span style="color:#e66170; font-weight:bold; ">char</span> b<span style="color:#d2cd86; ">,</span> <span style="color:#e66170; font-weight:bold; ">char</span> c<span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// If a = b and b = c we have a match</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">(</span>a <span style="color:#d2cd86; ">=</span><span style="color:#d2cd86; ">=</span> b<span style="color:#d2cd86; ">)</span> <span style="color:#d2cd86; ">&amp;</span><span style="color:#d2cd86; ">&amp;</span> <span style="color:#d2cd86; ">(</span>b <span style="color:#d2cd86; ">=</span><span style="color:#d2cd86; ">=</span> c<span style="color:#d2cd86; ">)</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// if it's an X, the winner is player one</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>a <span style="color:#d2cd86; ">=</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'X'</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// set the winner name</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>winner<span style="color:#d2cd86; ">,</span> pOne<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// set the winner mark</span></span>
<span class="line_wrapper">            winnerMark <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'X'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// return true</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span> <span style="color:#9999a9; ">// if not, player two is the winner</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">else</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// set the winner name</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>winner<span style="color:#d2cd86; ">,</span> pTwo<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// set the winner mark</span></span>
<span class="line_wrapper">            winnerMark <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'O'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// return true</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// If we had no match, return false</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">}</span></span></pre>
<span style="color:#ffffff; font-weight:bold; ">Syntax highlighting generated using</span> <a target='_blank' href='https://tohtml.com/c/'>https://tohtml.com/c/</a>               
            </section>
         </p>
         <p>
            This function is called <b>isMatch</b> and it takes three chars as parameters. Its job is to check if they are all the same. If they are it should return true (1) but a false (0) if they are not all the same. This should really be the end of what this function does but as beginners often do we've included something here that would be best done elsewhere. If there is a match, it checks to see if it's 'X' in which case, it moves the info for player one into the winner variables otherwise, it does the same but with player two's information. We'll address where this should live in the next version.
         </P>
         <p class='clear'>
            <section class='codeblock'>
<pre class="code_syntax" style="color:#d1d1d1;background:#000000;"><span class="line_wrapper"><span style="color:#9999a9; ">// Function:    gameOver()</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Parms:       none</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Return:      Returns a 1 (true) if the game is</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              ended and a 0 if it is not.</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> gameOver<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Just a counter</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">int</span> i <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Check the rows and cols</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">for</span> <span style="color:#d2cd86; ">(</span>i <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span> i <span style="color:#d2cd86; ">&lt;</span> <span style="color:#008c00; ">3</span><span style="color:#b060b0; ">;</span> i<span style="color:#d2cd86; ">+</span><span style="color:#d2cd86; ">+</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Check row i and column i to see if all three elements match</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>isMatch<span style="color:#d2cd86; ">(</span>board<span style="color:#d2cd86; ">[</span>i<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span>i<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span>i<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">)</span> <span style="color:#d2cd86; ">|</span><span style="color:#d2cd86; ">|</span></span>
<span class="line_wrapper">             isMatch<span style="color:#d2cd86; ">(</span>board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span>i<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span>i<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span>i<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">)</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// They all match! Return a 1</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Check the two diagonals to see if all three elements match.</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>isMatch<span style="color:#d2cd86; ">(</span>board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">)</span> <span style="color:#d2cd86; ">|</span><span style="color:#d2cd86; ">|</span></span>
<span class="line_wrapper">         isMatch<span style="color:#d2cd86; ">(</span>board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">)</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// They all match! Return a 1</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>turns <span style="color:#d2cd86; ">&gt;</span><span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">9</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// There is no winner but the game is over</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// If we've made it this far, there's no match. Return a 0.</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">}</span></span></pre>
<span style="color:#ffffff; font-weight:bold; ">Syntax highlighting generated using</span> <a target='_blank' href='https://tohtml.com/c/'>https://tohtml.com/c/</a>               
            </section>
         </P>
         <p>
            This function is called <b>gameOver</b> and it takes no parameters. It makes calls to the previous function (<b>isMatch</b>) with the contents of each row, each column and each diagonal. If a match is not found a 0 (false) is returned and play continues. If a match is found a 1 (true) is returned and the game ends. While checking every possible combination is a valid solution and in this very limited case doesn't cause a latency issue, there are more efficient ways to go about checking to see if the games been won and by whom.
         </p>
         <p class='clear'>
            <section class='codeblock'>
<pre class="code_syntax" style="color:#d1d1d1;background:#000000;"><span class="line_wrapper"><span style="color:#9999a9; ">// Function:    squareFill(int num)</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Parms:       require one integer indicating the</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              square to fill from 1-9</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Return:      Returns a 1 (true) if the game is</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> squareFill<span style="color:#d2cd86; ">(</span><span style="color:#e66170; font-weight:bold; ">int</span> num<span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">int</span> row <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span> <span style="color:#9999a9; ">// The row coordinate of the square</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">int</span> col <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span> <span style="color:#9999a9; ">// The column coordinate of the square</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">int</span> ret <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span> <span style="color:#9999a9; ">// The return value. Default to false (0)</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// If num is a valid square number (1-9) try to fill the square</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>num <span style="color:#d2cd86; ">&gt;</span><span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">1</span> <span style="color:#d2cd86; ">&amp;</span><span style="color:#d2cd86; ">&amp;</span> num <span style="color:#d2cd86; ">&lt;</span><span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">9</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Since array indicies start at zero, not one</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// we shift the number back by one.</span></span>
<span class="line_wrapper">        num<span style="color:#d2cd86; ">-</span><span style="color:#d2cd86; ">-</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Set the row index to the absolute value</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// (just the whole number part without any decimal</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// or remainder) of the number divided by three to</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// be the row index</span></span>
<span class="line_wrapper">        row <span style="color:#d2cd86; ">=</span> <span style="color:#e66170; font-weight:bold; ">abs</span><span style="color:#d2cd86; ">(</span>num <span style="color:#d2cd86; ">/</span> <span style="color:#008c00; ">3</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Set the column index to the remainder of the</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// above by subtracting the row index times three</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// from the original number.</span></span>
<span class="line_wrapper">        col <span style="color:#d2cd86; ">=</span> num <span style="color:#d2cd86; ">-</span> <span style="color:#d2cd86; ">(</span>row <span style="color:#d2cd86; ">*</span> <span style="color:#008c00; ">3</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Before placing the current players marker on the</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// square, check to see that it is not already used.</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>board<span style="color:#d2cd86; ">[</span>row<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span>col<span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">!</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'X'</span> <span style="color:#d2cd86; ">&amp;</span><span style="color:#d2cd86; ">&amp;</span> board<span style="color:#d2cd86; ">[</span>row<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span>col<span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">!</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'O'</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// Set the current players marker to the</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// board elemnt indicated.</span></span>
<span class="line_wrapper">            board<span style="color:#d2cd86; ">[</span>row<span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span>col<span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> marker<span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// count the turn</span></span>
<span class="line_wrapper">            turns<span style="color:#d2cd86; ">+</span><span style="color:#d2cd86; ">+</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// Set the return value to true (1).</span></span>
<span class="line_wrapper">            ret <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Return the return value</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">return</span> ret<span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">}</span></span></pre>
<span style="color:#ffffff; font-weight:bold; ">Syntax highlighting generated using</span> <a target='_blank' href='https://tohtml.com/c/'>https://tohtml.com/c/</a>               
            </section>
         </P>    
         <p>
            This is the <b>squareFill</b> function. It takes a single parameter, an integer, to indicate the square number that has been selected for the current player to place his marker on. As the name indicates it places the players marker on the square that has been selected provided the number is a valid square (1-9) and the array indices that the square number refers to are not already occupied.
         </p>
         <p class='clear'>
            <section class='codeblock'>
<pre class="code_syntax" style="color:#d1d1d1;background:#000000;"><span class="line_wrapper"><span style="color:#9999a9; ">// Function:    renderBoard()</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Parms:       none</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Return:      Draws the board and messages then returns 0</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> renderBoard<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Clear the screen</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">system</span><span style="color:#d2cd86; ">(</span>_CLR_CMD_<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Print the welcome message</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; ">Hello </span><span style="color:#007997; ">%s</span><span style="color:#00c4c4; "> (</span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; ">) and </span><span style="color:#007997; ">%s</span><span style="color:#00c4c4; "> (</span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; ">), lets play Tic-tac-toe...</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> pOne<span style="color:#d2cd86; ">,</span> pOneChar<span style="color:#d2cd86; ">,</span> pTwo<span style="color:#d2cd86; ">,</span> pTwoChar<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Print the basic instructions</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; ">Choose an unoccupied square 1-9 to place your marker on.</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Print the Tic-tac-toe board</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; "> </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> | </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> | </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> </span><span style="color:#008080; ">\n</span><span style="color:#00c4c4; ">-----------</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; "> </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> | </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> | </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> </span><span style="color:#008080; ">\n</span><span style="color:#00c4c4; ">-----------</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#00c4c4; "> </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> | </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> | </span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; "> </span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">,</span> board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Print any error messages</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#008080; ">\n</span><span style="color:#007997; ">%s</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> error<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// return 0</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">}</span></span></pre>
<span style="color:#ffffff; font-weight:bold; ">Syntax highlighting generated using</span> <a target='_blank' href='https://tohtml.com/c/'>https://tohtml.com/c/</a>               
            </section>
         </P>    
         <p>
            This is the <b>renderBoard</b> function. It takes no parameters. First it clears the screen using a system call. This does the job and with an application and a data set this small it's not really a problem but its a very inefficiant way to do this task because when you make that system call you load the whole program cls or clear and all its libraries run it then exit and return control to your program. In later versions, there are lots of other options for doing this. Next it prints it's hello message, the instructions such as they are, and then it displays the board in it's current state.  After displaying the board it prints any waiting error message. Some of you will have noticed an issue there too. We'll address that as we move forward. Lastly it returns a zero.
         </p>
         <p class='clear'>
            <section class='codeblock'>
<pre class="code_syntax" style="color:#d1d1d1;background:#000000;"><span class="line_wrapper"><span style="color:#9999a9; ">// Function:    main()</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Parms:       none</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">// Return:      Sets up the variables and then</span></span>
<span class="line_wrapper"><span style="color:#9999a9; ">//              executes the loop that runs the game</span></span>
<span class="line_wrapper"><span style="color:#e66170; font-weight:bold; ">int</span> <span style="color:#e66170; font-weight:bold; ">main</span><span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// This is the array that holds the values for</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// the board. It's a 3x3 array of chars.</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'1'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'2'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'3'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'4'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'5'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'6'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'7'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'8'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    board<span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span><span style="color:#d2cd86; ">[</span><span style="color:#008c00; ">2</span><span style="color:#d2cd86; ">]</span> <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'9'</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// A char to accept user input</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">char</span> userinput <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">' '</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Another char to absoarb the rest of stdin</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">char</span> altchar <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">' '</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Set the name of the first player to "Player One"</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>pOne<span style="color:#d2cd86; ">,</span> <span style="color:#02d045; ">"</span><span style="color:#00c4c4; ">Player One</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Set the name of the second player to "Player Two"</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>pTwo<span style="color:#d2cd86; ">,</span> <span style="color:#02d045; ">"</span><span style="color:#00c4c4; ">Player Two</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Prepopulating the error message with a space as a placeholder.</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>error<span style="color:#d2cd86; ">,</span> <span style="color:#02d045; ">"</span><span style="color:#00c4c4; "> </span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Copy player ones info to the current player variables</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>player<span style="color:#d2cd86; ">,</span> pOne<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    marker <span style="color:#d2cd86; ">=</span> pOneChar<span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Loop until there is a winner a draw or a Q</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">while</span> <span style="color:#d2cd86; ">(</span>userinput <span style="color:#d2cd86; ">!</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'q'</span> <span style="color:#d2cd86; ">&amp;</span><span style="color:#d2cd86; ">&amp;</span> userinput <span style="color:#d2cd86; ">!</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'Q'</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// reset the alt char to a space.</span></span>
<span class="line_wrapper">        altchar <span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">' '</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Draw the board in it's curent state</span></span>
<span class="line_wrapper">        renderBoard<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Promt the players for the next input</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#007997; ">%s</span><span style="color:#00c4c4; ">, Enter the square you want or Q to quit &gt;</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> player<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Get the next move</span></span>
<span class="line_wrapper">        userinput <span style="color:#d2cd86; ">=</span> <span style="color:#e66170; font-weight:bold; ">getchar</span><span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Empty stdin</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">while</span> <span style="color:#d2cd86; ">(</span>altchar <span style="color:#d2cd86; ">!</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'\n'</span> <span style="color:#d2cd86; ">&amp;</span><span style="color:#d2cd86; ">&amp;</span> altchar <span style="color:#d2cd86; ">!</span><span style="color:#d2cd86; ">=</span> <span style="color:#007d45; ">EOF</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            altchar <span style="color:#d2cd86; ">=</span> <span style="color:#e66170; font-weight:bold; ">getchar</span><span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper"></span>
<span class="line_wrapper">        <span style="color:#9999a9; ">// Check for a quit command</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>userinput <span style="color:#d2cd86; ">=</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'q'</span> <span style="color:#d2cd86; ">|</span><span style="color:#d2cd86; ">|</span> userinput <span style="color:#d2cd86; ">=</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'Q'</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// Say goodbye</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">sprintf</span><span style="color:#d2cd86; ">(</span>error<span style="color:#d2cd86; ">,</span> <span style="color:#02d045; ">"</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#00c4c4; ">All done. You pressed: </span><span style="color:#007997; ">%c</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> userinput<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// Draw the board and then exit</span></span>
<span class="line_wrapper">            renderBoard<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">exit</span><span style="color:#d2cd86; ">(</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">else</span> <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>userinput <span style="color:#d2cd86; ">&gt;</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'1'</span> <span style="color:#d2cd86; ">&amp;</span><span style="color:#d2cd86; ">&amp;</span> userinput <span style="color:#d2cd86; ">&lt;</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'9'</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// If a move has been attempted try to implement it</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>squareFill<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">(</span><span style="color:#e66170; font-weight:bold; ">int</span><span style="color:#d2cd86; ">)</span>userinput <span style="color:#d2cd86; ">-</span> <span style="color:#008c00; ">48</span><span style="color:#d2cd86; ">)</span><span style="color:#d2cd86; ">)</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">            <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">                <span style="color:#9999a9; ">// Check to see if this move has ended the game</span></span>
<span class="line_wrapper">                <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>gameOver<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">                <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">                    <span style="color:#9999a9; ">// Check to see if there is a winner</span></span>
<span class="line_wrapper">                    <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>winnerMark <span style="color:#d2cd86; ">!</span><span style="color:#d2cd86; ">=</span> <span style="color:#00c4c4; ">'-'</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">                        <span style="color:#9999a9; ">// Congratulate the winer</span></span>
<span class="line_wrapper">                        <span style="color:#e66170; font-weight:bold; ">sprintf</span><span style="color:#d2cd86; ">(</span>error<span style="color:#d2cd86; ">,</span> <span style="color:#02d045; ">"</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#00c4c4; ">Winner!</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#007997; ">%s</span><span style="color:#00c4c4; "> (</span><span style="color:#007997; ">%c</span><span style="color:#00c4c4; ">) wins!!</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> player<span style="color:#d2cd86; ">,</span> marker<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">                    <span style="color:#e66170; font-weight:bold; ">else</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">                        <span style="color:#9999a9; ">// Let the players know that it's a draw</span></span>
<span class="line_wrapper">                        <span style="color:#e66170; font-weight:bold; ">sprintf</span><span style="color:#d2cd86; ">(</span>error<span style="color:#d2cd86; ">,</span> <span style="color:#02d045; ">"</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#00c4c4; ">Draw. No winner this time.</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">                    <span style="color:#9999a9; ">// Draw the board and then exit</span></span>
<span class="line_wrapper">                    renderBoard<span style="color:#d2cd86; ">(</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                    <span style="color:#e66170; font-weight:bold; ">exit</span><span style="color:#d2cd86; ">(</span><span style="color:#008c00; ">0</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">                <span style="color:#e66170; font-weight:bold; ">else</span></span>
<span class="line_wrapper">                <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">                    <span style="color:#9999a9; ">// The game continues</span></span>
<span class="line_wrapper">                    <span style="color:#e66170; font-weight:bold; ">if</span> <span style="color:#d2cd86; ">(</span>turn <span style="color:#d2cd86; ">=</span><span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">1</span><span style="color:#d2cd86; ">)</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">                        <span style="color:#9999a9; ">// update the turn tracker</span></span>
<span class="line_wrapper">                        turn <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">2</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                        <span style="color:#9999a9; ">// Copy the player 2 info into the current player variables</span></span>
<span class="line_wrapper">                        <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>player<span style="color:#d2cd86; ">,</span> pTwo<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                        marker <span style="color:#d2cd86; ">=</span> pTwoChar<span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">                    <span style="color:#e66170; font-weight:bold; ">else</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">                        <span style="color:#9999a9; ">// update the turn tracker</span></span>
<span class="line_wrapper">                        turn <span style="color:#d2cd86; ">=</span> <span style="color:#008c00; ">1</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                        <span style="color:#9999a9; ">// Copy the player 1 info into the current player variables</span></span>
<span class="line_wrapper">                        <span style="color:#e66170; font-weight:bold; ">strcpy</span><span style="color:#d2cd86; ">(</span>player<span style="color:#d2cd86; ">,</span> pOne<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                        marker <span style="color:#d2cd86; ">=</span> pOneChar<span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">                    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">                <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">            <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">        <span style="color:#e66170; font-weight:bold; ">else</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">{</span></span>
<span class="line_wrapper">            <span style="color:#9999a9; ">// A character thats not a valid square number</span></span>
<span class="line_wrapper">            <span style="color:#e66170; font-weight:bold; ">sprintf</span><span style="color:#d2cd86; ">(</span>error<span style="color:#d2cd86; ">,</span> <span style="color:#02d045; ">"</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#00c4c4; ">Invalid character on last input: </span><span style="color:#007997; ">%c</span><span style="color:#008080; ">\n</span><span style="color:#008080; ">\n</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">,</span> userinput<span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">        <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#b060b0; ">}</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Say goodbye</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">printf</span><span style="color:#d2cd86; ">(</span><span style="color:#02d045; ">"</span><span style="color:#008080; ">\n</span><span style="color:#00c4c4; ">Bye!</span><span style="color:#02d045; ">"</span><span style="color:#d2cd86; ">)</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper">    <span style="color:#9999a9; ">// Return a zero</span></span>
<span class="line_wrapper">    <span style="color:#e66170; font-weight:bold; ">return</span> <span style="color:#008c00; ">0</span><span style="color:#b060b0; ">;</span></span>
<span class="line_wrapper"><span style="color:#b060b0; ">}</span></span></pre>
<span style="color:#ffffff; font-weight:bold; ">Syntax highlighting generated using</span> <a target='_blank' href='https://tohtml.com/c/'>https://tohtml.com/c/</a>               
            </section>
         </P>    
         <p>
            This is the <b>main</b> function. It takes no parameters. Its starts out by setting some initial values and then sets up player on by copying the name into the player variable and the pOneChar (X) into the marker variable. Then it starts up the gamepaly loop. That loop will continue until the game ends or a user presses 'q' or 'Q'.
         </p>
         <p>
            Inside the loop we first draw the board. then we print a message to tell the player to enter their move. Next we collect the users input with getchar. It wouldn't take long using this method to discover that the user has to hit enter after the input and that more than one char can be input before the enter key and all of that needs to be collected from stdin before the next turn can be taken. otherwise each of those characters is processed as turn input so if you were for your first turn to type 142576 and then hit enter the game would just be over and player two would have won. In order to avoid this, a typical beginner solution would be to call getchar until you get either an EOF or an enter key.
         </P>
         <P>
            Now that we have our input we can process it. First we check to see if its a 'q' or a 'Q' and if it is, we set the error message to a goodbye message, render the board and exit. If it's a number from 1 to 9 we'll handle it. If not, then we set an error message and start the next iteration of the loop.
         </P>
         <P>
            In cases where the input is a number from one through 9 the software converts the input from a char to an int and calls the squarefill function to execute the move. There, the default return value is set to false. Then the number is converted from an number to a row and column index. It checks to see if the indicates square is already taken. If it is, the false value is returned. If it's not then the square is filled with the current players marker as stored in 'marker'. then the turn counter is incremented (maybe this isn't the best palce to do that) and the return value is set to 1 (true) and returned.
         </P>
         <P>
            Next the gameOver function is called to see if the game has ended. It sends each row, each column and, both diagonals to the isMatch function. If a Match is detected, the players name and marker are coppied into the winner variables. and true is returned. If true is returned gameOver just returns a 1 (true).  If that hasn't happened the turns taken are checked to see if the number is >=9 and if it is nothing is coppied to the winner variables but a 1 (true) is returned indicating a draw. If we are at less than nine turns, a 0 (false) is returned and play continues. The turn indicator is switched and the other players info is coppied into the player variables.
         </P>
         <p>
            Thats it. A lot of room for improvement but two people could definately sit down and play a game of Tic-tac-toe. In the next article in this series we will make a list of improvements. Reasearch possible ways to execute them and com up with an improved version.
         </p>
         <p>
            <b>Cheers!</b>
         </p>
		</section>
        `,
        slug: "learning-to=code",
        date: new Date('2024-09-17'),
        type: "code"
      },
      {
        id: 3,
        title: "Goober MVC",
        subtitle: "A simple headless MVC",
        mainimg: "/articles/3/goober.jpg",
        preview: "This is A simple MVC I'm working on as a learning project. At the moment it has no dashboard and doesn't use a DB at all so really more of a VC. I'm sure that will change as I add to it over time.",
        safeHTML: undefined,
        content: "<img class='topimg' src='/articles/3/goober.jpg'>This is A simple MVC I'm working onas a learning project. At the moment it has no dashboard and doesn't use a DB at all so really more of a VC. I'm sure  that will change as I add to it over time. Right now I'm just sorting out the pathhandlers and theme application. There's not too much to look at yet, but if you want to, the code including the container configs are all in the repo on my <a href=\"https://github.com/makeBrooklyn/goober\">GitHub.</a>",
        slug: "goober",
        date: new Date('2024-10-03'),
        type: "code"
      },
      {
        id: 4,
        title: "Hello",
        subtitle: "Who I am and how I got here",
        mainimg: "/articles/4/hi.jpg",
        preview: "This is me. My name is Jim and I've been writing software and managing servers for a long time.",
        safeHTML: undefined,
        content: "<p>         <img class='topimg' src='/articles/4/me.jpg' />This is me. My name is Jim and I&#39;ve been writing software and managing servers for a long time. I&#39;ve worked for huge companies like WebMD where I was one member of an exceptionally talented team and I was focused very narrowly as an ops engineer and I have worked for small local companies where I am the whole technology department and I serve as the dev team, the sys admin and tech support. I have been navigating the technology landscape professionally for more than 40 years and I continue to be fascinated by the ever-changing landscape and the ways it impacts our lives as individuals and as a society.			</p>			<p>			<img class='inlinerightimg' src='/articles/4/c64.jpg' />I don't want this to be a novel, so I&#39;ll abbreviate the coming-of-age story to say that we had several systems when I was a kid and while I enjoyed playing space invaders on my Atari 800 as much as the next kid, I spent even more time using the programming language carts. I don&#39;t remember all the machines we had, but the ones that had the deepest influence were probably the Atari 800 and the Commodore 64 that really gave me a shove down the software path. They both gave easy access to software development tools and if I remember right they came with a lot of educational material.  There were many other systems I worked and played with during my early years including trash 80&#39;s and these Bell and Howell Apple II Plus machines we had at my high school that may well have been assembled by Woz himself! I think what attracted me to programming initially was the absolute order of the practice. None of it will work unless you get everything exactly right but the satisfaction when you do get it all right and your program works is enormous. I think it&#39;s similar to the dopamine hit you get from building something complex with Lego but much bigger. I&#39;m skipping over rather a lot but maybe we&#39;ll come back to it in another post.			</p>			<p>			<img class='inlinerightimg' src='/articles/4/modem.jpg' />With a blazing fast 300 baud modem and an audio coupler connected to our rotary phone I had acces to whole new worlds in the galaxy of servers, BBS systems and, MUDs not to mention all that was available through CompuServe! Combining those with IRC chat servers gave access to a whole culture and community that was entirely invisible to the rest of the world. It was an early version of what the internet would later become. Up until this point you could find a knitting club or a car club within a reasonable travel radius of where you lived but finding a c compiler enthusiasts club was somewhat less likely. Unless, that is, you had a computer, a modem and the know how to navigate the universe of BBS systems and IRC channels. There you could find others with whom you could discuss .bat scripting, new and creative ways to use double linked lists and whether or not OS2 would dominate the computing landscape in the future. It was an awesome time to be one of the few who could participate in this early version of the digital landscape. It felt like we were ramping up to something huge, and we were. The coming 90&#39;s would bring Linux which would come to power almost the whole of the internet. That combined with the arrival of AOL and Netscape Navigator fueled the internet explosion that led us into the next millennium.			</p>			<p>			<img class='inlineleftimg' src='/articles/4/Clipper2.jpg' /><img class='inlinerightimg' src='/articles/4/Clipper.jpg' />After high school, I worked a few jobs that I was mostly terrible at but after a year or so working tech support on the helpdesk of a Japanese company I was able to get promoted to an entry level programming job. The language used at the time is one probably most people have never heard of called Clipper. It was one of a family of high level programming languages called the X-based languages that all had similar syntax and data storage structures. It was a compiled language meant to run on MS DOS. I had never heard of it before that job but I bought a book that explained the syntax and faked it until I had it figured out. That was probably somewhere in the mid 90&#39;s. I worked constantly to be a better programmer day and night. We were building a system to act as a front end to a dataset that was comming from our mainframe. If I remeber right I think it may have been an IBM 3090. It took up all of a massive room with it&#39;s own air conditioning and halon fire suppression system. The legacy system ran on cobalt and was accessed via 3270 terminals. We had already made the switch to pc&#39;s running Dos, windows and terminal emulation software connected to a banyan vines network using token ring topology, so this was still fairly early days in terms of computing the way we currently understand it. It was a great time to learn and grow as a developer. At work I gained skill with clipper as a tool but also as a software engineer in general learning how to solve problems with algorithms and data structures and how to create useable interfaces with which people could interact with those structures to do the business of the company.			</P>			<p>			<img class='inlinerightimg' src='/articles/4/tux.png' />While I was learning to be a skilled developer at work with clipper and the new 4gl products that came after like SmallTalk and PowerBuilder and eventually Visual Basic and Visual C++. I did a lot of my personal exploration with C which turned out to be useful as I began an ongoing exploration of Linux. This could be another whole series of articles, so I&#39;ll just say that Linux was a free Operating system meant to replicate the proprietary AT&T / Bell Labs Unix operating system. It allowed for multiple users with discrete file permissions and multi-tasking. Linux and its many additions extensions and components are mostly (Some of the base components were made with Assembly) written in C.  The best part though is that the Linux source code is open sourced and free for all to use copy and modify which meant if you knew your way around a c compiler you could make it do just about anything. Most of the projects I worked on in my free time used C and Linux building systems to organize data and make use of it in interesting ways. Many of those applications were games but more were systems that would collect information from remote sources and present it in a usable way which was a kind of precursor to the function that many website would later fill.			</P>			<p>			<img class='inlineleftimg' src='/articles/4/compiler.jpg' />It didn&#39;t take too long for me to get find work as a C developer and I had the good fortune to be able to work on a tremendous variety of projects from systems to manage text communications via beepers to POS systems for national retail chains running on minx at checkout counters. They all boiled down to either getting information from a source to a destination, directing action based on existing and input data or organizing large data sets into actionable intelligence. While I have myriad other tools at my disposal today, C still holds a prominent place in the toolkit I use to solve problems for myself and my clients and employers.			</P>			<p>			<img class='inlinerightimg' src='/articles/4/php.png' />Towards the end of the 90&#39;s I found myself looking for a new job and I got an interview with a web company who made early versions of what social media would become. They were looking for a web developer using HTML, CSS, JavaScript and something called PHP. The first thing I did before the interview was ask a friend who also worked in the tech sector, “What&#39;s PHP”? It turned out to be an interpreted scripting language for building dynamic, interactive websites. A pre-processor that could access data and output dynamic HTML to send to the user&#39;s browser. A brand-new concept at the time. I immediately set up a development environment and got an understanding of the basics. Apparently, what I managed to assimilate over an intensive 3 days of experimenting with it was enough to get the job. Probably because PHP was not dissimilar to C. It had similar operators and control structures and syntax without any of the pesky memory management required by C, so I was able to pick it up very quickly. In all the roles I&#39;ve held since, with the exception of my time as an Ops engineers for WebMD, PHP has been a part. I probably have more time working specifically with PHP, Apache and MySQL on Linux than any combination of technologies I&#39;ve worked with before. I became very familiar with the various frameworks that made use of PHP including WordPress along with the constellation of PHP based MVC frameworks like Cake, CodeIgniter, Zend, Drupal and Joomla to name just a few.			</P>			<p>			<img class='inlineleftimg' src='/articles/4/veep.jpg' />In my last role, I was the VP of Technology though this was another case where it was a small company and I handled development, operations, security, support, logistics and pretty much every other technology role. I did it largely on my own but sometimes I was able to get help from the excellent interns and occasional team members I sometimes got to work with. While I enjoyed having the title I think in reality, I prefer to be either a lead software developer, architect or sysadmin. I&#39;m much better off in roles where I can focus for fairly long periods on solving complex problems. 			</P>			<p>			So now I&#39;ve arrived at a place where I don&#39;t necessarily have the same financial burdens that I&#39;ve carried up until now. With that in mind I&#39;m taking my time to find a position that I want to fill. One where I&#39;m having a positive impact on the world around me and I find the problems to be solved both interesting and worthwhile.			Anyway, that&#39;s me and how I got here.<br /><br />			I&#39;ve not been great at continuing blogs in the past, lets see if I can alter that trend here.<br /><br />			Cheers!<br /><br />			Jim<br />			</P>",
        slug: "hello",
        date: new Date('2024-02-02'),
        type: "blog"
      }
  ];

  notFound: ArticleDetail = {
    id: 0,
    title: "Content Could Not Be Found",
    subtitle: "",
    mainimg: "",
    preview: "Error: Content Not Found.",
    safeHTML: undefined,
    content: "Error: Content Not Found.",
    slug: "404",
    date: new Date(),
    type: "page"
  };

  constructor() { }

  getAllArticles():ArticleDetail[] {
    return this.articleList ;
  }

  getArticleNotFound() {
    return this.notFound ;
  }
  
  getArticleById(id: Number):ArticleDetail {
    return this.articleList.find(article => article.id === id) ||  this.notFound ;
  }

  getArticleByType(type: string) : ArticleDetail[] {
    return this.articleList.filter(article => article.type === type);
  }
}

