class DropBoxController{
    
    constructor(){
        
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        this.namefileEl = this.snackModalEl.querySelector('.filename');
        this.timeleftEl = this.snackModalEl.querySelector('.timeleft');
        this.initEvents();
        console.log(this.timeleftEl)
        
    }
    
    initEvents(){
        
        this.btnSendFileEl.addEventListener('click', event=>{
            
            this.inputFilesEl.click();
               
            
        });
        
        this.inputFilesEl.addEventListener('change', event=>{
            
            
                this.uploadTask(event.target.files);

                this.modalShow();

                this.inputFilesEl.value = '';
            
        });
        
        
    }

    modalShow(show = true){

        this.snackModalEl.style.display = (show) ? 'block' : 'none';

    }

    uploadTask(files){
        
          let promises = [];
          
          [...files].forEach(file=>{
              
              promises.push(new Promise((resolve, reject)=>{
                  
                 let ajax = new XMLHttpRequest();
                 ajax.open('POST', '/upload');
                 ajax.onload = event =>{
                     
                    this.modalShow(false);

                    try{
                         
                        resolve(JSON.parse(ajax.responseText));
                            
                    }catch(e){
                         
                         reject(e);               
                         
                    }
                     
                 };
                 
                 ajax.onerro = event=>{
                     
                    this.modalShow();
                    reject(event);
                     
                 };

                 ajax.upload.onprogress = event =>{

                    this.uploadProgress(event, file);
                    

                 }
                 
                 let formData = new FormData();
                 formData.append('input-file', file);

                 this.startUploadTime = Date.now();

                 ajax.send(formData);
                 console.log(formData);
                  
              }));
              
          });
          
          return Promise.all(promises);
        
    }

    uploadProgress(event, file){

        let timespent = Date.now() - this.startUploadTime;

        let loaded = event.loaded;
        let total = event.total;
        

        //Regra de três
        let porcent = parseInt((loaded / total) * 100);
        let timeleft = ((100 - porcent) * timespent) / porcent;

        this.progressBarEl.style.width = `${porcent}%`;

        this.namefileEl.innerHTML = file.name;
        this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);

    }

    formatTimeToHuman(duration){

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0 ){

            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;

        }

        if(minutes > 0 ){

            return `${minutes} minutos e ${seconds} segundos`;

        }

        if(seconds > 0 ){

            return `${seconds} segundos`;

        }

        return '';

    }

    getFileIconView(file){

        switch(file.type){

            case 'folder':

            return `
            
            <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
                <title>content-folder-large</title>
                <g fill="none" fill-rule="evenodd">
                    <path d="M77.955 53h50.04A3.002 3.002 0 0 1 131 56.007v58.988a4.008 4.008 0 0 1-4.003 4.005H39.003A4.002 4.002 0 0 1 35 114.995V45.99c0-2.206 1.79-3.99 3.997-3.99h26.002c1.666 0 3.667 1.166 4.49 2.605l3.341 5.848s1.281 2.544 5.12 2.544l.005.003z" fill="#71B9F4"></path>
                    <path d="M77.955 52h50.04A3.002 3.002 0 0 1 131 55.007v58.988a4.008 4.008 0 0 1-4.003 4.005H39.003A4.002 4.002 0 0 1 35 113.995V44.99c0-2.206 1.79-3.99 3.997-3.99h26.002c1.666 0 3.667 1.166 4.49 2.605l3.341 5.848s1.281 2.544 5.12 2.544l.005.003z" fill="#92CEFF"></path>
                </g>
            </svg>
            
            `;
            break

            case '':

            return `
            
                <svg width="160" height="160" viewBox="0 0 160 160" class="mc-icon-template-content tile__preview tile__preview--icon">
                    <title>1357054_617b.jpg</title>
                    <defs>
                        <rect id="mc-content-unknown-large-b" x="43" y="30" width="74" height="100" rx="4"></rect>
                        <filter x="-.7%" y="-.5%" width="101.4%" height="102%" filterUnits="objectBoundingBox" id="mc-content-unknown-large-a">
                            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                            <feColorMatrix values="0 0 0 0 0.858823529 0 0 0 0 0.870588235 0 0 0 0 0.88627451 0 0 0 1 0" in="shadowOffsetOuter1"></feColorMatrix>
                        </filter>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                         <g>
                            <use fill="#000" filter="url(#mc-content-unknown-large-a)" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-unknown-large-b"></use>
                            <use fill="#F7F9FA" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mc-content-unknown-large-b"></use>
                        </g>
                    </g>
                </svg>
            
            `

            break


        }

    }

    getFileView(file){

        return `
        
            <li>
                ${this.getFileIconView(file)}
                <div class="name text-center">${file.name}</div>
            </li>
        
        `

    }
    
}

