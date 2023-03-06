# ITUnderground website  
The cool website for ITUnderground!  
  
# Adding a command  
Adding a new command is very simple. Just follow these steps:  
1. Add a file in `src/lib/shell/commands`. (See other commands for structure).  
2. In the function you have access to 1 parameter, the `AccessObject`. Import it to see the properties you have access to.  
3. After defining the function, add a description with `functionname.description = "some description"` (If you don't do this, the website will not build).  
4. Add your command to `/src/lib/shell/commands/index.ts` (follow the examples).  
5. Your new command should now be available!  