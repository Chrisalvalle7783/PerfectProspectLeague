
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";

const C = {
  bg: "#071019",
  panel: "#0D1821",
  panel2: "#111F2B",
  border: "#223442",
  text: "#F6F7F8",
  muted: "#9AA9B5",
  red: "#E02020",
  red2: "#A70C16",
  gold: "#C8A56A",
  blue: "#1D6FA5",
  green: "#2B7A4B",
};

const categories = ["8U","9U","10U","11U","12U","13U","14U","15U","16U","17U"];

const games = [
  {
    id: "g1",
    category: "14U",
    date: "Sáb, 12 Abr 2025",
    time: "10:00 AM",
    venue: "Parque Julio E. Monagas",
    home: "Perfect Prospect 14U",
    away: "Carolina 14U",
    homeShort: "PP",
    awayShort: "CA",
    status: "PRÓXIMO",
  },
  {
    id: "g2",
    category: "13U",
    date: "Sáb, 12 Abr 2025",
    time: "1:30 PM",
    venue: "Caguas Sports Complex",
    home: "Bayamón Guardians",
    away: "Ponce Prospects",
    homeShort: "BG",
    awayShort: "PO",
    status: "PRÓXIMO",
  },
  {
    id: "g3",
    category: "15U",
    date: "10 Abr 2025",
    time: "Final",
    venue: "Hato Rey Park",
    home: "Perfect Prospect 15U",
    away: "Bayamón Baseball",
    homeShort: "PP",
    awayShort: "BB",
    homeScore: 7,
    awayScore: 3,
    status: "FINAL",
  },
];

const teams = [
  { name: "Perfect Prospect", city: "San Juan", category: "14U", record: "8-2" },
  { name: "Carolina", city: "Carolina", category: "14U", record: "7-3" },
  { name: "Bayamón Guardians", city: "Bayamón", category: "14U", record: "6-4" },
  { name: "Arecibo Wolves", city: "Arecibo", category: "14U", record: "5-5" },
];

const players = [
  { id: 1, name: "Carlos Martínez", no: 24, pos: "SS", team: "Perfect Prospect", category: "14U", avg: ".412", rbi: 18 },
  { id: 2, name: "Luis Rodríguez", no: 7, pos: "CF", team: "Carolina", category: "14U", avg: ".389", rbi: 15 },
  { id: 3, name: "Miguel Torres", no: 18, pos: "RHP", team: "Bayamón Guardians", category: "14U", era: "1.84", so: 42 },
];

const standings = [
  { rank: 1, team: "Perfect Prospect", w: 8, l: 2, pct: ".800", gb: "-" },
  { rank: 2, team: "Carolina", w: 7, l: 3, pct: ".700", gb: "1.0" },
  { rank: 3, team: "Bayamón Guardians", w: 6, l: 4, pct: ".600", gb: "2.0" },
  { rank: 4, team: "Arecibo Wolves", w: 5, l: 5, pct: ".500", gb: "3.0" },
];

function BrandMark({ small=false }) {
  return (
    <View style={[styles.brandMark, small && styles.brandMarkSmall]}>
      <Text style={[styles.brandLetters, small && styles.brandLettersSmall]}>PP</Text>
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Pressable style={styles.menuButton}><Text style={styles.menuText}>☰</Text></Pressable>
      <View style={styles.headerBrand}>
        <BrandMark small />
        <View>
          <Text style={styles.headerTitle}>PERFECT</Text>
          <Text style={styles.headerTitle}>PROSPECT</Text>
        </View>
      </View>
      <View style={styles.bell}>
        <View style={styles.bellDot} />
        <Text style={styles.bellGlyph}>◉</Text>
      </View>
    </View>
  );
}

function SectionTitle({ title, action }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

function CategoryStrip({ selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryStrip}>
      {categories.map((c) => (
        <Pressable key={c} onPress={() => onSelect(c)} style={[styles.categoryChip, selected===c && styles.categoryChipActive]}>
          <Text style={[styles.categoryText, selected===c && styles.categoryTextActive]}>{c}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function TeamBadge({ text, red=false }) {
  return (
    <View style={[styles.teamBadge, red && styles.teamBadgeRed]}>
      <Text style={styles.teamBadgeText}>{text}</Text>
    </View>
  );
}

function MatchCard({ game }) {
  const final = game.status === "FINAL";
  return (
    <View style={styles.matchCard}>
      <Text style={styles.matchMeta}>{game.category} · TEMPORADA REGULAR</Text>
      <Text style={styles.matchDate}>{game.date}{!final ? `  •  ${game.time}` : ""}</Text>

      {final ? (
        <View style={styles.scoreRows}>
          <View style={styles.scoreRow}>
            <TeamBadge text={game.homeShort} />
            <Text style={styles.scoreTeam}>{game.home}</Text>
            <Text style={styles.scoreValue}>{game.homeScore}</Text>
          </View>
          <View style={styles.scoreRow}>
            <TeamBadge text={game.awayShort} red />
            <Text style={styles.scoreTeam}>{game.away}</Text>
            <Text style={styles.scoreValue}>{game.awayScore}</Text>
          </View>
          <View style={styles.finalBox}>
            <Text style={styles.finalLabel}>FINAL</Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.matchTeams}>
            <View style={styles.teamColumn}>
              <TeamBadge text={game.homeShort} />
              <Text style={styles.matchTeamName}>{game.home}</Text>
            </View>
            <Text style={styles.vs}>VS</Text>
            <View style={styles.teamColumn}>
              <TeamBadge text={game.awayShort} red />
              <Text style={styles.matchTeamName}>{game.away}</Text>
            </View>
          </View>
          <Text style={styles.venue}>⌖  {game.venue}</Text>
        </>
      )}
    </View>
  );
}

function QuickButton({ label, symbol, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.quickButton}>
      <Text style={styles.quickSymbol}>{symbol}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

function HomeScreen({ selectedCategory, setSelectedCategory, navigate }) {
  const nextGame = games.find(g => g.category === selectedCategory && g.status !== "FINAL") || games[0];
  const recent = games.filter(g => g.status === "FINAL");

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.hero}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroEyebrow}>PERFECT PROSPECT</Text>
          <Text style={styles.heroTitle}>LEAGUE</Text>
          <Text style={styles.heroCopy}>COMPETENCIA REAL{"\n"}PARA GRANDES{"\n"}OPORTUNIDADES</Text>
          <View style={styles.heroPlayer}>
            <Text style={styles.heroNumber}>24</Text>
          </View>
        </View>
      </View>

      <CategoryStrip selected={selectedCategory} onSelect={setSelectedCategory} />

      <SectionTitle title="PRÓXIMOS JUEGOS" action="Ver todos" />
      <MatchCard game={nextGame} />

      <View style={styles.quickGrid}>
        <QuickButton label="CALENDARIO" symbol="▦" onPress={() => navigate("Juegos")} />
        <QuickButton label="STANDINGS" symbol="▰" onPress={() => navigate("Stats")} />
        <QuickButton label="EQUIPOS" symbol="●●●" onPress={() => navigate("Equipos")} />
        <QuickButton label="JUGADORES" symbol="●" onPress={() => navigate("Jugadores")} />
        <QuickButton label="ESTADÍSTICAS" symbol="▮▮▮" onPress={() => navigate("Stats")} />
        <QuickButton label="REGLAS" symbol="≡" onPress={() => navigate("Más")} />
      </View>

      <SectionTitle title="RESULTADOS RECIENTES" action="Ver todos" />
      {recent.map(g => <MatchCard key={g.id} game={g} />)}
      <View style={{height: 92}} />
    </ScrollView>
  );
}

function GamesScreen({ selectedCategory, setSelectedCategory }) {
  const filtered = games.filter(g => g.category === selectedCategory);
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.pageTitle}>Juegos</Text>
      <CategoryStrip selected={selectedCategory} onSelect={setSelectedCategory} />
      <SectionTitle title="CALENDARIO Y RESULTADOS" />
      {(filtered.length ? filtered : games).map(g => <MatchCard key={g.id} game={g} />)}
      <View style={{height: 92}} />
    </ScrollView>
  );
}

function TeamsScreen({ selectedCategory, setSelectedCategory }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.pageTitle}>Equipos</Text>
      <CategoryStrip selected={selectedCategory} onSelect={setSelectedCategory} />
      <SectionTitle title={`EQUIPOS ${selectedCategory}`} />
      {teams.map((t, i) => (
        <View key={t.name} style={styles.teamCard}>
          <TeamBadge text={t.name.split(" ").map(x=>x[0]).join("").slice(0,2)} red={i%2===1} />
          <View style={{flex:1}}>
            <Text style={styles.teamCardName}>{t.name}</Text>
            <Text style={styles.teamCardMeta}>{t.city} · {selectedCategory}</Text>
          </View>
          <Text style={styles.teamRecord}>{t.record}</Text>
        </View>
      ))}
      <View style={{height: 92}} />
    </ScrollView>
  );
}

function PlayersScreen({ selectedCategory }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => players.filter(p => `${p.name} ${p.pos} ${p.team}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.pageTitle}>Jugadores</Text>
      <Text style={styles.adminNote}>Los perfiles son creados y administrados únicamente por el administrador de la liga.</Text>
      <TextInput value={q} onChangeText={setQ} placeholder="Buscar jugador, equipo o posición" placeholderTextColor={C.muted} style={styles.search} />
      <SectionTitle title={`ROSTER / ${selectedCategory}`} />
      {filtered.map(p => (
        <View key={p.id} style={styles.playerCard}>
          <View style={styles.playerAvatar}><Text style={styles.playerNo}>{p.no}</Text></View>
          <View style={{flex:1}}>
            <Text style={styles.playerName}>{p.name}</Text>
            <Text style={styles.playerMeta}>{p.pos} · {p.team} · {p.category}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>
      ))}
      <View style={{height: 92}} />
    </ScrollView>
  );
}

function StatsScreen({ selectedCategory, setSelectedCategory }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.pageTitle}>Estadísticas</Text>
      <CategoryStrip selected={selectedCategory} onSelect={setSelectedCategory} />

      <View style={styles.segment}>
        <View style={[styles.segmentItem, styles.segmentActive]}><Text style={styles.segmentActiveText}>STANDINGS</Text></View>
        <View style={styles.segmentItem}><Text style={styles.segmentText}>EQUIPOS</Text></View>
        <View style={styles.segmentItem}><Text style={styles.segmentText}>RÓSTERS</Text></View>
      </View>

      <SectionTitle title={`STANDINGS ${selectedCategory}`} />
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, {width:28}]}>#</Text>
          <Text style={[styles.th, {flex:1}]}>Equipo</Text>
          <Text style={styles.th}>W</Text><Text style={styles.th}>L</Text>
          <Text style={[styles.th,{width:50}]}>PCT</Text><Text style={styles.th}>GB</Text>
        </View>
        {standings.map(r => (
          <View key={r.rank} style={styles.tableRow}>
            <Text style={[styles.rankCell, {width:28}]}>{r.rank}</Text>
            <Text style={[styles.td, {flex:1}]}>{r.team}</Text>
            <Text style={styles.td}>{r.w}</Text><Text style={styles.td}>{r.l}</Text>
            <Text style={[styles.td,{width:50}]}>{r.pct}</Text><Text style={styles.td}>{r.gb}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title="ESTADÍSTICAS DE JUGADORES" />
      {players.map(p => (
        <View key={p.id} style={styles.statPlayer}>
          <View style={styles.playerAvatarSmall}><Text style={styles.playerNoSmall}>{p.no}</Text></View>
          <View style={{flex:1}}>
            <Text style={styles.playerName}>{p.name}</Text>
            <Text style={styles.playerMeta}>{p.pos} · {p.team}</Text>
          </View>
          <View style={styles.statPair}>
            <Text style={styles.statValue}>{p.avg || p.era}</Text>
            <Text style={styles.statLabel}>{p.avg ? "AVG" : "ERA"}</Text>
          </View>
        </View>
      ))}
      <View style={{height: 92}} />
    </ScrollView>
  );
}

function MoreScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.pageTitle}>Más</Text>
      {[
        ["Notificaciones","Alertas de juegos, cambios y resultados"],
        ["Reglas de liga","Reglamentos y formatos por categoría"],
        ["Campos","Ubicaciones y mapas de los parques"],
        ["Contacto","Información oficial de Perfect Prospect League"],
        ["Administrador","Acceso administrativo protegido"],
      ].map(([a,b]) => (
        <View key={a} style={styles.moreCard}>
          <View>
            <Text style={styles.moreTitle}>{a}</Text>
            <Text style={styles.moreSub}>{b}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>
      ))}
      <View style={styles.versionBox}>
        <BrandMark />
        <Text style={styles.versionTitle}>PERFECT PROSPECT</Text>
        <Text style={styles.versionSub}>LEAGUE APP · v1.0.0</Text>
      </View>
      <View style={{height: 92}} />
    </ScrollView>
  );
}

function TabBar({ tab, setTab }) {
  const items = [
    ["Inicio","⌂"],
    ["Juegos","◉"],
    ["Equipos","●●●"],
    ["Stats","▮▮▮"],
    ["Más","•••"],
  ];
  return (
    <View style={styles.tabBar}>
      {items.map(([name, icon]) => (
        <Pressable key={name} onPress={()=>setTab(name)} style={styles.tabItem}>
          <Text style={[styles.tabIcon, tab===name && styles.tabActive]}>{icon}</Text>
          <Text style={[styles.tabText, tab===name && styles.tabActive]}>{name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function AppShell() {
  const [tab, setTab] = useState("Inicio");
  const [category, setCategory] = useState("14U");

  const navigate = (screen) => {
    if (["Inicio","Juegos","Equipos","Stats","Más"].includes(screen)) setTab(screen);
    else if (screen==="Jugadores") setTab("Jugadores");
  };

  let content = null;
  if (tab === "Inicio") content = <HomeScreen selectedCategory={category} setSelectedCategory={setCategory} navigate={navigate} />;
  else if (tab === "Juegos") content = <GamesScreen selectedCategory={category} setSelectedCategory={setCategory} />;
  else if (tab === "Equipos") content = <TeamsScreen selectedCategory={category} setSelectedCategory={setCategory} />;
  else if (tab === "Stats") content = <StatsScreen selectedCategory={category} setSelectedCategory={setCategory} />;
  else if (tab === "Jugadores") content = <PlayersScreen selectedCategory={category} />;
  else content = <MoreScreen navigate={navigate} />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <Header />
      <View style={{flex:1}}>{content}</View>
      <TabBar tab={tab === "Jugadores" ? "Equipos" : tab} setTab={setTab} />
    </SafeAreaView>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  if (entered) return <AppShell />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.login}>
        <View style={styles.loginLightsLeft} />
        <View style={styles.loginLightsRight} />
        <View style={styles.loginCenter}>
          <BrandMark />
          <Text style={styles.loginTitle}>PERFECT PROSPECT</Text>
          <Text style={styles.loginSubtitle}>LEAGUE APP</Text>
          <View style={styles.loginBall}><Text style={styles.loginBallText}>⚾</Text></View>
        </View>
        <View style={styles.loginActions}>
          <Pressable style={styles.primaryBtn} onPress={()=>setEntered(true)}>
            <Text style={styles.primaryBtnText}>ENTRAR</Text>
          </Pressable>
          <Pressable style={styles.secondaryBtn} onPress={()=>setEntered(true)}>
            <Text style={styles.secondaryBtnText}>VER COMO INVITADO</Text>
          </Pressable>
          <Text style={styles.loginFoot}>Los perfiles de jugadores son administrados exclusivamente por la liga.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:C.bg},
  header:{height:70,backgroundColor:"#080F15",borderBottomWidth:1,borderBottomColor:"#182630",flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:18},
  menuButton:{width:42,height:42,justifyContent:"center"},menuText:{color:C.text,fontSize:24},
  headerBrand:{flexDirection:"row",alignItems:"center",gap:10},
  headerTitle:{color:C.text,fontSize:16,fontWeight:"900",lineHeight:16,letterSpacing:.8},
  bell:{width:42,height:42,alignItems:"center",justifyContent:"center"},bellGlyph:{color:C.text,fontSize:20},bellDot:{position:"absolute",right:8,top:7,width:8,height:8,borderRadius:8,backgroundColor:C.red,zIndex:3},
  brandMark:{width:92,height:76,borderWidth:3,borderColor:C.gold,borderRadius:18,alignItems:"center",justifyContent:"center",transform:[{skewX:"-8deg"}]},
  brandMarkSmall:{width:48,height:40,borderWidth:2,borderRadius:10},
  brandLetters:{fontSize:38,fontWeight:"900",color:C.text,letterSpacing:-7},brandLettersSmall:{fontSize:19,letterSpacing:-3},
  scroll:{padding:14,paddingBottom:0},
  hero:{height:205,borderRadius:4,overflow:"hidden",backgroundColor:"#132532",marginBottom:12,borderWidth:1,borderColor:"#1E3342"},
  heroOverlay:{flex:1,padding:18,backgroundColor:"rgba(5,12,18,.25)",justifyContent:"center"},
  heroEyebrow:{color:C.text,fontSize:19,fontWeight:"900",fontStyle:"italic"},heroTitle:{color:C.text,fontSize:42,fontWeight:"900",fontStyle:"italic",lineHeight:46},
  heroCopy:{marginTop:8,color:"#D4D9DD",fontWeight:"700",fontSize:12,letterSpacing:2,lineHeight:17},
  heroPlayer:{position:"absolute",right:-28,bottom:-34,width:185,height:185,borderRadius:100,borderWidth:25,borderColor:"#1A2933",alignItems:"center",justifyContent:"center",transform:[{rotate:"-12deg"}]},
  heroNumber:{fontSize:80,fontWeight:"900",color:"#87939B",opacity:.35},
  categoryStrip:{gap:7,paddingVertical:6,paddingRight:20},categoryChip:{paddingHorizontal:13,paddingVertical:9,borderRadius:4,backgroundColor:"#111E28",borderWidth:1,borderColor:"#1D303E"},categoryChipActive:{backgroundColor:C.red,borderColor:C.red},
  categoryText:{color:C.muted,fontSize:12,fontWeight:"800"},categoryTextActive:{color:C.text},
  sectionTitleRow:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:15,marginBottom:9},
  sectionTitle:{color:C.text,fontSize:17,fontWeight:"900"},sectionAction:{color:C.gold,fontSize:12,fontWeight:"700"},
  matchCard:{backgroundColor:C.panel,borderColor:C.border,borderWidth:1,borderRadius:10,padding:13,marginBottom:10},
  matchMeta:{color:"#7FA7C1",fontSize:11,fontWeight:"800"},matchDate:{color:"#D4DDE3",fontSize:12,textAlign:"center",marginTop:3,marginBottom:10},
  matchTeams:{flexDirection:"row",alignItems:"center",justifyContent:"space-around"},teamColumn:{width:"38%",alignItems:"center"},matchTeamName:{color:C.text,fontSize:13,fontWeight:"700",textAlign:"center",marginTop:6},
  teamBadge:{width:48,height:48,borderRadius:24,backgroundColor:"#0C2638",borderWidth:2,borderColor:"#5C8196",alignItems:"center",justifyContent:"center"},
  teamBadgeRed:{backgroundColor:"#321115",borderColor:"#944049"},teamBadgeText:{color:C.text,fontSize:15,fontWeight:"900"},
  vs:{color:"#C7D0D7",fontSize:22,fontWeight:"900"},venue:{color:C.muted,textAlign:"center",fontSize:12,marginTop:10},
  scoreRows:{position:"relative"},scoreRow:{flexDirection:"row",alignItems:"center",gap:10,marginTop:8},scoreTeam:{color:C.text,flex:1,fontSize:13,fontWeight:"700"},scoreValue:{color:C.text,fontSize:22,fontWeight:"900"},
  finalBox:{position:"absolute",right:36,top:8,bottom:8,width:50,borderLeftWidth:1,borderLeftColor:C.border,alignItems:"center",justifyContent:"center",display:"none"},finalLabel:{color:C.red,fontSize:11,fontWeight:"900"},
  quickGrid:{flexDirection:"row",flexWrap:"wrap",gap:8,marginTop:4},quickButton:{width:"31.8%",height:78,borderRadius:8,borderWidth:1,borderColor:C.border,backgroundColor:C.panel,alignItems:"center",justifyContent:"center"},
  quickSymbol:{color:C.text,fontSize:20,fontWeight:"900",marginBottom:5},quickLabel:{color:C.text,fontSize:10,fontWeight:"800",textAlign:"center"},
  pageTitle:{color:C.text,fontSize:29,fontWeight:"900",marginTop:4,marginBottom:10},
  teamCard:{flexDirection:"row",alignItems:"center",gap:12,backgroundColor:C.panel,borderWidth:1,borderColor:C.border,borderRadius:10,padding:12,marginBottom:9},
  teamCardName:{color:C.text,fontSize:15,fontWeight:"900"},teamCardMeta:{color:C.muted,fontSize:12,marginTop:3},teamRecord:{color:C.gold,fontSize:16,fontWeight:"900"},
  adminNote:{color:"#C9B783",backgroundColor:"#211D12",borderColor:"#4B4327",borderWidth:1,padding:12,borderRadius:8,fontSize:12,lineHeight:18,marginBottom:10},
  search:{backgroundColor:C.panel,borderWidth:1,borderColor:C.border,borderRadius:8,color:C.text,paddingHorizontal:13,paddingVertical:12,fontSize:14},
  playerCard:{flexDirection:"row",alignItems:"center",backgroundColor:C.panel,borderWidth:1,borderColor:C.border,borderRadius:10,padding:12,marginBottom:8},
  playerAvatar:{width:48,height:48,borderRadius:24,backgroundColor:"#172D3C",alignItems:"center",justifyContent:"center",marginRight:11},playerNo:{color:C.text,fontSize:17,fontWeight:"900"},
  playerName:{color:C.text,fontSize:14,fontWeight:"900"},playerMeta:{color:C.muted,fontSize:11,marginTop:3},chevron:{color:C.muted,fontSize:26},
  segment:{flexDirection:"row",backgroundColor:"#0A141C",borderRadius:7,overflow:"hidden",borderWidth:1,borderColor:C.border,marginVertical:11},segmentItem:{flex:1,paddingVertical:11,alignItems:"center"},segmentActive:{backgroundColor:C.red},segmentText:{color:C.muted,fontSize:11,fontWeight:"900"},segmentActiveText:{color:C.text,fontSize:11,fontWeight:"900"},
  table:{borderWidth:1,borderColor:C.border,borderRadius:8,overflow:"hidden",backgroundColor:C.panel},tableHeader:{flexDirection:"row",backgroundColor:"#13232E",paddingVertical:8,paddingHorizontal:7},tableRow:{flexDirection:"row",paddingVertical:10,paddingHorizontal:7,borderTopWidth:1,borderTopColor:"#1A2B36"},
  th:{color:C.muted,fontSize:10,fontWeight:"900",width:31,textAlign:"center"},td:{color:C.text,fontSize:11,width:31,textAlign:"center"},rankCell:{color:C.gold,fontSize:11,fontWeight:"900",textAlign:"center"},
  statPlayer:{flexDirection:"row",alignItems:"center",backgroundColor:C.panel,borderWidth:1,borderColor:C.border,borderRadius:9,padding:10,marginBottom:8},playerAvatarSmall:{width:40,height:40,borderRadius:20,backgroundColor:"#172D3C",alignItems:"center",justifyContent:"center",marginRight:10},playerNoSmall:{color:C.text,fontWeight:"900"},
  statPair:{alignItems:"flex-end"},statValue:{color:C.text,fontSize:18,fontWeight:"900"},statLabel:{color:C.muted,fontSize:9,fontWeight:"900"},
  moreCard:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:C.panel,borderWidth:1,borderColor:C.border,borderRadius:10,padding:15,marginBottom:9},moreTitle:{color:C.text,fontSize:15,fontWeight:"900"},moreSub:{color:C.muted,fontSize:11,marginTop:3,maxWidth:280},
  versionBox:{alignItems:"center",marginTop:28,marginBottom:14},versionTitle:{color:C.text,fontSize:18,fontWeight:"900",marginTop:12},versionSub:{color:C.muted,fontSize:11,letterSpacing:1.5,marginTop:4},
  tabBar:{position:"absolute",bottom:0,left:0,right:0,height:76,backgroundColor:"#08131B",borderTopWidth:1,borderTopColor:"#1D303E",flexDirection:"row",paddingBottom:6},
  tabItem:{flex:1,alignItems:"center",justifyContent:"center"},tabIcon:{color:"#91A1AD",fontSize:19,fontWeight:"900"},tabText:{color:"#91A1AD",fontSize:10,marginTop:5},tabActive:{color:C.red},
  login:{flex:1,backgroundColor:"#060E15",justifyContent:"space-between",overflow:"hidden"},
  loginLightsLeft:{position:"absolute",left:-70,top:80,width:180,height:180,borderRadius:180,backgroundColor:"#4A0B10",opacity:.45},
  loginLightsRight:{position:"absolute",right:-80,top:60,width:200,height:200,borderRadius:200,backgroundColor:"#073B63",opacity:.55},
  loginCenter:{alignItems:"center",paddingTop:120},loginTitle:{color:C.text,fontSize:31,fontWeight:"900",fontStyle:"italic",marginTop:18},loginSubtitle:{color:"#D9DEE2",fontSize:14,letterSpacing:7,marginTop:8},
  loginBall:{width:250,height:250,borderRadius:130,borderWidth:1,borderColor:"#263843",alignItems:"center",justifyContent:"center",marginTop:50,backgroundColor:"#0B161E"},loginBallText:{fontSize:120},
  loginActions:{padding:22,paddingBottom:44},primaryBtn:{backgroundColor:C.red,borderRadius:28,paddingVertical:16,alignItems:"center",marginBottom:11},primaryBtnText:{color:C.text,fontWeight:"900",fontSize:15},
  secondaryBtn:{borderColor:"#62717C",borderWidth:1,borderRadius:28,paddingVertical:15,alignItems:"center"},secondaryBtnText:{color:C.text,fontWeight:"900",fontSize:13},
  loginFoot:{color:C.muted,textAlign:"center",fontSize:10,lineHeight:15,marginTop:16,paddingHorizontal:20},
});
