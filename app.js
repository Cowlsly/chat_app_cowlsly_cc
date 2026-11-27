import { showToast, setLoading, preventDuplicate, openDialog, closeDialog } from './ui.js';
const STORAGE_KEY='cowlsly-chat-demo-v1';
const seed={active:'marla',sound:false,reducedMotion:false,chats:[{id:'marla',name:'Marla',type:'ai',status:'Online · AI contact',muted:false,blocked:false,messages:[{id:'m1',mine:false,text:'Hi Cowy — this is the Cowlsly Chat demo shell. Nothing here leaves this browser.',at:Date.now()-3600000,state:'read'},{id:'m2',mine:true,text:'Good. Keep it clear and simple.',at:Date.now()-3500000,state:'read'}]},{id:'support',name:'Cowlsly Support',type:'person',status:'Demo contact',muted:false,blocked:false,messages:[{id:'s1',mine:false,text:'Welcome to the messenger preview. Use the controls to test the interaction model.',at:Date.now()-7200000,state:'delivered'}]}]};
const load=()=>{
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
    const merged = {...structuredClone(seed), ...raw};
    // Basic normalisation: limit chats, clean messages
    if (Array.isArray(merged.chats)) {
      merged.chats = merged.chats.slice(0, 50).map((c, i) => {
        if (!c || typeof c !== 'object') return null;
        const id = typeof c.id === 'string' && /^[A-Za-z0-9_-]{1,80}$/.test(c.id.trim()) ? c.id.trim() : `restored-${i+1}`;
        const messages = Array.isArray(c.messages) ? c.messages.slice(-200).map(m => {
          if (!m || typeof m.text !== 'string') return null;
          return {
            id: typeof m.id === 'string' ? m.id.slice(0,40) : crypto.randomUUID(),
            mine: !!m.mine,
            text: m.text.trim().slice(0, 500),
            at: typeof m.at === 'number' ? m.at : Date.now(),
            state: ['sent','delivered','read'].includes(m.state) ? m.state : 'sent',
            replyText: typeof m.replyText === 'string' ? m.replyText.slice(0,200) : '',
            saved: !!m.saved,
            edited: !!m.edited
          };
        }).filter(Boolean) : [];
        return {
          id,
          name: typeof c.name === 'string' ? c.name.trim().slice(0,60) || `Contact ${i+1}` : `Contact ${i+1}`,
          type: c.type === 'ai' ? 'ai' : 'person',
          status: typeof c.status === 'string' ? c.status.slice(0,80) : 'Demo contact',
          muted: !!c.muted,
          blocked: !!c.blocked,
          messages
        };
      }).filter(Boolean);
      if (!merged.chats.length) return structuredClone(seed);
      if (!merged.chats.some(c => c.id === merged.active)) merged.active = merged.chats[0].id;
    }
    return merged;
  } catch { return structuredClone(seed); }
};
let state=load(); let replyTo=null; let editingId=null;
const $=s=>document.querySelector(s); const shell=$('.app-shell'); const list=$('#conversation-list'); const messages=$('#messages'); const input=$('#message-input');
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
const active=()=>state.chats.find(c=>c.id===state.active)||state.chats[0];
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&','<':'<','>':'>','"':'"',"'":'&#39;'}[m]));
function renderList(filter=''){list.innerHTML='';state.chats.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase())).forEach(c=>{const last=c.messages.at(-1);const b=document.createElement('button');b.type='button';b.className='chat-row'+(c.id===state.active?' active':'');b.innerHTML=`<span class="row-avatar">${esc(c.name[0]||'?')}</span><span class="row-main"><strong>${esc(c.name)}${c.muted?' · 🔇':''}</strong><span>${esc(last?.text||'No messages yet')}</span></span><time>${last?new Date(last.at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):''}</time>`;b.onclick=()=>{state.active=c.id;save();render();shell.classList.add('chat-open')};list.appendChild(b)});if(!list.children.length)list.innerHTML='<div class="empty">No matching conversations.</div>'}
function renderMessages(){const c=active();messages.innerHTML='';const q=$('#message-search-input').value.trim().toLowerCase();const rows=c.messages.filter(m=>!q||m.text.toLowerCase().includes(q));rows.forEach(m=>{const el=document.createElement('article');el.className='message'+(m.mine?' mine':'');el.tabIndex=0;const quote=m.replyText?`<div class="quoted">${esc(m.replyText)}</div>`:'';el.innerHTML=`${quote}<div>${esc(m.text)}</div><div class="meta"><span>${new Date(m.at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span><span>${esc(m.state||'sent')}</span>${m.saved?'<span>★</span>':''}</div><div class="message-actions"><button data-act="reply" aria-label="Reply">↩</button>${m.mine?'<button data-act="edit" aria-label="Edit">✎</button>':''}<button data-act="copy" aria-label="Copy">⧉</button><button data-act="save" aria-label="Save">★</button>${m.mine?'<button data-act="delete" aria-label="Delete">×</button>':''}</div>`;el.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>messageAction(m,b.dataset.act));messages.appendChild(el)});if(!rows.length)messages.innerHTML='<div class="empty">No messages found.</div>';requestAnimationFrame(()=>messages.scrollTop=messages.scrollHeight)}
function renderHeader(){const c=active();$('#active-name').textContent=c.name;$('#active-status').textContent=(c.blocked?'Blocked · ':c.muted?'Muted · ':'')+c.status;$('#active-avatar').textContent=c.name[0]||'?'}
function render(){renderList($('#search').value);renderHeader();renderMessages();document.body.classList.toggle('reduced-motion',!!state.reducedMotion);$('#sound-toggle').setAttribute('aria-pressed',String(!!state.sound));$('#motion-toggle').setAttribute('aria-pressed',String(!!state.reducedMotion))}
function messageAction(m,act){const c=active();if(act==='reply'){replyTo=m;editingId=null;$('#reply-banner').hidden=false;$('#reply-text').textContent=m.text;input.focus()}if(act==='edit'){editingId=m.id;replyTo=null;$('#reply-banner').hidden=false;$('#reply-text').textContent='Editing your message';input.value=m.text;input.focus()}if(act==='copy'){navigator.clipboard?.writeText(m.text);showToast('Copied')}if(act==='save'){m.saved=!m.saved;save();renderMessages();showToast(m.saved?'Saved':'Unsaved')}if(act==='delete'){c.messages=c.messages.filter(x=>x.id!==m.id);save();render();showToast('Message deleted')}}
$('#composer').addEventListener('submit',e=>{e.preventDefault();const sendBtn = e.submitter || $('#composer button[type="submit"]') || e.target.querySelector('button');preventDuplicate(sendBtn, () => {const c=active();const text=input.value.trim();if(!text||c.blocked)return;if(editingId){const m=c.messages.find(x=>x.id===editingId);if(m){m.text=text;m.edited=true;m.at=Date.now()}editingId=null}else{c.messages.push({id:crypto.randomUUID(),mine:true,text,replyText:replyTo?.text||'',at:Date.now(),state:'sent'});setTimeout(()=>{const m=c.messages.at(-1);if(m?.mine){m.state='delivered';save();renderMessages()}},550)}replyTo=null;$('#reply-banner').hidden=true;input.value='';save();render();if(state.sound)navigator.vibrate?.(18)})});
$('#cancel-reply').onclick=()=>{replyTo=null;editingId=null;$('#reply-banner').hidden=true;input.value=''};
$('#search').oninput=e=>renderList(e.target.value);
$('#back').onclick=()=>shell.classList.remove('chat-open');
$('#new-chat').onclick=()=>openDialog('new-chat-dialog');
$('#create-chat').onclick=e=>{e.preventDefault();const name=$('#new-chat-name').value.trim();if(!name)return;const id=crypto.randomUUID();state.chats.unshift({id,name,type:$('#new-chat-type').value,status:$('#new-chat-type').value==='ai'?'AI contact':'New contact',muted:false,blocked:false,messages:[]});state.active=id;save();closeDialog('new-chat-dialog');$('#new-chat-name').value='';render();shell.classList.add('chat-open')};
$('#sound-toggle').onclick=()=>{state.sound=!state.sound;save();render();showToast(state.sound?'Sounds on':'Sounds off')};
$('#motion-toggle').onclick=()=>{state.reducedMotion=!state.reducedMotion;save();render();showToast(state.reducedMotion?'Reduced motion on':'Reduced motion off')};
$('#search-messages').onclick=()=>{const bar=$('#message-search-bar');bar.hidden=!bar.hidden;if(!bar.hidden)$('#message-search-input').focus()};
$('#close-message-search').onclick=()=>{$('#message-search-bar').hidden=true;$('#message-search-input').value='';renderMessages()};
$('#message-search-input').oninput=renderMessages;
$('#attach').onclick=()=>showToast('Attachment flow is intentionally disabled in this demo');
$('#chat-menu').onclick=()=>{const c=active();const d=$('#action-dialog');$('#action-dialog-content').innerHTML=`<h2>${esc(c.name)}</h2><div class="menu-grid"><button class="pill-btn" data-menu="mute">${c.muted?'Unmute':'Mute'}</button><button class="pill-btn" data-menu="block">${c.blocked?'Unblock':'Block'}</button><button class="pill-btn" data-menu="report">Report</button><button class="pill-btn" data-menu="clear">Clear chat</button></div><div class="dialog-actions"><button class="pill-btn" data-menu="close">Close</button></div>`;$('#action-dialog-content').querySelectorAll('[data-menu]').forEach(b=>b.onclick=()=>{const a=b.dataset.menu;if(a==='mute')c.muted=!c.muted;if(a==='block')c.blocked=!c.blocked;if(a==='report')showToast('Demo report recorded locally only');if(a==='clear')c.messages=[];save();render();if(a!=='report')d.close()});openDialog('action-dialog')};
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#composer').requestSubmit()}});
render();
