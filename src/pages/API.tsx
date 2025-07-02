
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Key, Code, Send, CheckCircle, XCircle, Info } from "lucide-react";

const API = () => {
  const apiEndpoint = "https://api.whatsapp-manager.com/v1/send";
  const apiKey = "wa_live_sk_1234567890abcdef";

  const exampleRequest = `{
  "client_id": "12345",
  "line_id": "line_premium_001", 
  "to": "+5511999999999",
  "template": {
    "name": "promocao_black_friday",
    "language": "pt_BR",
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "João Silva"
          },
          {
            "type": "text", 
            "text": "50%"
          }
        ]
      }
    ]
  },
  "metadata": {
    "campaign": "black_friday_2024",
    "source": "crm_system"
  }
}`;

  const exampleResponseSuccess = `{
  "success": true,
  "message_id": "msg_1234567890",
  "status": "authorized",
  "whatsapp_id": "wamid.XXXXXXXXXXXXX",
  "timestamp": "2024-01-20T15:30:25Z",
  "rules_applied": [
    "frequency_check",
    "sending_window",
    "line_usage_limit"
  ],
  "metadata": {
    "processing_time_ms": 45,
    "line_usage_after": "78%"
  }
}`;

  const exampleResponseBlocked = `{
  "success": false,
  "status": "blocked",
  "reason": "Limite de mensagens sem retorno excedido",
  "rule_violated": "maxMessagesWithoutReply",
  "details": {
    "current_count": 3,
    "limit": 3,
    "period": "24h",
    "last_message": "2024-01-19T15:30:25Z"
  },
  "timestamp": "2024-01-20T15:30:25Z",
  "metadata": {
    "processing_time_ms": 12
  }
}`;

  const statusCodes = [
    { code: "200", status: "OK", description: "Mensagem autorizada e enviada" },
    { code: "400", status: "Bad Request", description: "Dados da requisição inválidos" },
    { code: "401", status: "Unauthorized", description: "API Key inválida ou ausente" }, 
    { code: "403", status: "Forbidden", description: "Mensagem bloqueada pelas regras" },
    { code: "429", status: "Too Many Requests", description: "Limite de rate exceeded" },
    { code: "500", status: "Internal Server Error", description: "Erro interno do servidor" }
  ];

  const webhookEvents = [
    {
      event: "message.sent",
      description: "Mensagem foi enviada com sucesso para o WhatsApp",
      example: `{
  "event": "message.sent",
  "message_id": "msg_1234567890", 
  "whatsapp_id": "wamid.XXXXXXXXXXXXX",
  "timestamp": "2024-01-20T15:30:25Z"
}`
    },
    {
      event: "message.blocked", 
      description: "Mensagem foi bloqueada pelas regras",
      example: `{
  "event": "message.blocked",
  "message_id": "msg_1234567890",
  "reason": "Limite de mensagens sem retorno excedido",
  "rule_violated": "maxMessagesWithoutReply",
  "timestamp": "2024-01-20T15:30:25Z"
}`
    },
    {
      event: "message.delivered",
      description: "Mensagem foi entregue ao destinatário",
      example: `{
  "event": "message.delivered",
  "message_id": "msg_1234567890",
  "whatsapp_id": "wamid.XXXXXXXXXXXXX", 
  "timestamp": "2024-01-20T15:31:45Z"
}`
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentação da API</h1>
          <p className="text-gray-600">Integração com a API de controle de disparos</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            API Online
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            v1.0
          </Badge>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          A API de controle processa cada solicitação em tempo real, aplicando todas as regras configuradas antes de autorizar o envio para o WhatsApp.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="authentication">Autenticação</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  <span>Base URL</span>
                </CardTitle>
                <CardDescription>Endpoint principal da API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm">{apiEndpoint}</code>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-green-600" />
                  <span>API Key</span>
                </CardTitle>
                <CardDescription>Chave de autenticação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm">{apiKey}</code>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Utilize esta chave no header Authorization: Bearer
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Autorização</CardTitle>
              <CardDescription>Como funciona o processo de validação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Recepção da Solicitação</h4>
                    <p className="text-sm text-gray-600">API recebe requisição de envio via POST</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Validação das Regras</h4>
                    <p className="text-sm text-gray-600">Sistema aplica todas as regras configuradas para o cliente/linha</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Envio Autorizado</h4>
                    <p className="text-sm text-gray-600">Se aprovado, mensagem é encaminhada para WhatsApp API</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bloqueio</h4>
                    <p className="text-sm text-gray-600">Se rejeitado, retorna erro com motivo detalhado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação via API Key</CardTitle>
              <CardDescription>Como autenticar suas requisições</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Header de Autenticação</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm">Authorization: Bearer {apiKey}</code>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">Exemplo cURL</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`curl -X POST ${apiEndpoint} \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "12345",
    "to": "+5511999999999",
    "template": {...}
  }'`}
                  </pre>
                </div>
              </div>

              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  Mantenha sua API Key segura. Nunca a exponha em código client-side ou repositórios públicos.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>POST /v1/send</CardTitle>
                <CardDescription>Solicitar envio de mensagem WhatsApp</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Exemplo de Requisição</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto">
                    <pre className="text-sm">{exampleRequest}</pre>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Resposta de Sucesso (200)</Label>
                  <div className="mt-2 p-4 bg-green-50 rounded-lg overflow-x-auto">
                    <pre className="text-sm">{exampleResponseSuccess}</pre>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Resposta de Bloqueio (403)</Label>
                  <div className="mt-2 p-4 bg-red-50 rounded-lg overflow-x-auto">
                    <pre className="text-sm">{exampleResponseBlocked}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Códigos de Status</CardTitle>
                <CardDescription>Possíveis retornos da API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statusCodes.map((status, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className={
                          status.code.startsWith('2') ? 'bg-green-100 text-green-800' :
                          status.code.startsWith('4') ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {status.code}
                        </Badge>
                        <span className="font-medium">{status.status}</span>
                      </div>
                      <span className="text-sm text-gray-600">{status.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="webhooks">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Webhooks</CardTitle>
                <CardDescription>Receba notificações em tempo real sobre o status das mensagens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="webhook-url">URL do Webhook</Label>
                    <Input 
                      id="webhook-url" 
                      placeholder="https://seu-sistema.com/webhooks/whatsapp"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhook-secret">Secret Key</Label>
                    <Input 
                      id="webhook-secret" 
                      placeholder="sua-secret-key-aqui"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                  <Button className="w-fit">
                    <Send className="mr-2 h-4 w-4" />
                    Testar Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eventos Disponíveis</CardTitle>
                <CardDescription>Tipos de notificações que você pode receber</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {webhookEvents.map((event, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {event.event}
                        </Badge>
                        <span className="text-sm text-gray-600">{event.description}</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg overflow-x-auto">
                        <pre className="text-sm">{event.example}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default API;
