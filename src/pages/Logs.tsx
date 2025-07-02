
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, RefreshCw, AlertTriangle, CheckCircle, XCircle, Settings } from "lucide-react";

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-01-20 14:30:25",
      user: "admin@empresa.com",
      action: "Alteração de Regra",
      details: "Limite de mensagens sem retorno alterado de 5 para 3",
      client: "TechCorp Ltda",
      ip: "192.168.1.100"
    },
    {
      id: 2,
      timestamp: "2024-01-20 13:15:10", 
      user: "admin@empresa.com",
      action: "Novo Cliente",
      details: "Cliente 'Marketing Digital Plus' criado",
      client: "-",
      ip: "192.168.1.100"
    },
    {
      id: 3,
      timestamp: "2024-01-20 12:45:33",
      user: "operador@empresa.com",
      action: "Alteração de Status",
      details: "Linha Premium pausada temporariamente",
      client: "E-commerce Solutions",
      ip: "192.168.1.105"
    }
  ];

  const blockLogs = [
    {
      id: 1,
      timestamp: "2024-01-20 15:45:12",
      client: "TechCorp Ltda",
      phone: "+55 11 99999-0001",
      reason: "Limite de mensagens sem retorno excedido",
      rule: "maxMessagesWithoutReply",
      template: "Promoção Black Friday",
      details: "3 mensagens enviadas em 24h sem resposta"
    },
    {
      id: 2,
      timestamp: "2024-01-20 15:42:38",
      client: "Marketing Digital Plus", 
      phone: "+55 11 99999-0002",
      reason: "Fora da janela de envio",
      rule: "sendingWindow",
      template: "Lembrete de Pagamento",
      details: "Tentativa de envio às 19:42 (limite: 18:00)"
    },
    {
      id: 3,
      timestamp: "2024-01-20 15:38:19",
      client: "TechCorp Ltda",
      phone: "+55 11 99999-0003", 
      reason: "Intervalo mínimo não respeitado",
      rule: "minimumInterval",
      template: "Boas-vindas Novos Clientes",
      details: "Última mensagem enviada há 15 minutos (mínimo: 30 min)"
    },
    {
      id: 4,
      timestamp: "2024-01-20 15:35:47",
      client: "E-commerce Solutions",
      phone: "+55 11 99999-0004",
      reason: "Limite de uso da linha atingido",
      rule: "lineUsageLimit", 
      template: "Promoção Black Friday",
      details: "Linha Standard com 82% de uso (limite: 80%)"
    },
    {
      id: 5,
      timestamp: "2024-01-20 15:32:15",
      client: "Marketing Digital Plus",
      phone: "+55 11 99999-0005",
      reason: "Contato em bloqueio temporário",
      rule: "temporaryBlock",
      template: "Lembrete de Pagamento", 
      details: "Contato bloqueado por 60 minutos após múltiplas tentativas"
    }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: "2024-01-20 16:00:00",
      level: "INFO",
      component: "API Gateway",
      message: "Processo de validação de regras executado com sucesso",
      details: "1.247 solicitações processadas em 2.3s"
    },
    {
      id: 2, 
      timestamp: "2024-01-20 15:58:45",
      level: "WARNING",
      component: "Rule Engine",
      message: "Alta taxa de bloqueios detectada",
      details: "23 bloqueios nos últimos 15 minutos"
    },
    {
      id: 3,
      timestamp: "2024-01-20 15:55:30",
      level: "INFO",
      component: "WhatsApp API",
      message: "Conexão com API do WhatsApp restabelecida", 
      details: "Timeout de 30s resolvido automaticamente"
    },
    {
      id: 4,
      timestamp: "2024-01-20 15:50:12",
      level: "ERROR",
      component: "Database",
      message: "Timeout na consulta de regras",
      details: "Query executada em 5.2s (limite: 5s)"
    }
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "INFO":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      INFO: "bg-blue-100 text-blue-800",
      WARNING: "bg-yellow-100 text-yellow-800", 
      ERROR: "bg-red-100 text-red-800"
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs do Sistema</h1>
          <p className="text-gray-600">Auditoria completa e logs de bloqueio</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="blocks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blocks">Bloqueios</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="blocks">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Log de Bloqueios</CardTitle>
                  <CardDescription>Todas as tentativas de envio bloqueadas pelas regras</CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por cliente, número..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">Todos os motivos</SelectItem>
                      <SelectItem value="frequency">Frequência</SelectItem>
                      <SelectItem value="timing">Horário</SelectItem>
                      <SelectItem value="limits">Limites</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>{log.client}</TableCell>
                      <TableCell className="font-mono">{log.phone}</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          {log.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.template}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Log de Auditoria</CardTitle>
              <CardDescription>Registro de todas as alterações e ações administrativas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4 text-blue-600" />
                          <span>{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {log.details}
                      </TableCell>
                      <TableCell>
                        {log.client !== "-" ? (
                          <Badge variant="outline">{log.client}</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-gray-600">
                        {log.ip}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Log do Sistema</CardTitle>
              <CardDescription>Eventos e erros técnicos da plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Componente</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getLevelIcon(log.level)}
                          <Badge variant="outline" className={getLevelBadge(log.level)}>
                            {log.level}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {log.component}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Logs;
