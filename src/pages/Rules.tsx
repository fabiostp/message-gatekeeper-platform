
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Clock, Users, MessageSquare, Settings, Info } from "lucide-react";

const Rules = () => {
  const [rules, setRules] = useState({
    maxMessagesWithoutReply: { enabled: true, value: 3, period: "24h" },
    allowNewContacts: { enabled: false },
    templateRotation: { enabled: true },
    lineUsageLimit: { enabled: true, value: 80 },
    minimumInterval: { enabled: true, value: 30, unit: "minutes" },
    temporaryBlock: { enabled: true, value: 60, unit: "minutes" },
    sendingWindow: { enabled: true, start: "08:00", end: "18:00" },
    weekendSending: { enabled: false },
    engagementRequired: { enabled: true, value: 30 }
  });

  const [selectedClient, setSelectedClient] = useState("all");

  const clients = [
    { id: "all", name: "Todas as Linhas" },
    { id: "1", name: "TechCorp Ltda" },
    { id: "2", name: "Marketing Digital Plus" },
    { id: "3", name: "E-commerce Solutions" }
  ];

  const ruleCategories = [
    {
      id: "frequency",
      title: "Controle de Frequência",
      icon: Clock,
      color: "text-blue-600",
      rules: [
        {
          key: "maxMessagesWithoutReply",
          title: "Máximo de mensagens sem retorno",
          description: "Limite de mensagens consecutivas para contatos que não respondem",
          component: (
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                value={rules.maxMessagesWithoutReply.value}
                className="w-20"
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  maxMessagesWithoutReply: { ...prev.maxMessagesWithoutReply, value: parseInt(e.target.value) }
                }))}
              />
              <span className="text-sm text-gray-600">mensagens em</span>
              <Select 
                value={rules.maxMessagesWithoutReply.period}
                onValueChange={(value) => setRules(prev => ({
                  ...prev,
                  maxMessagesWithoutReply: { ...prev.maxMessagesWithoutReply, period: value }
                }))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1h">1h</SelectItem>
                  <SelectItem value="24h">24h</SelectItem>
                  <SelectItem value="7d">7 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )
        },
        {
          key: "minimumInterval",
          title: "Intervalo mínimo entre mensagens",
          description: "Tempo de espera antes de enviar nova mensagem para o mesmo contato",
          component: (
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                value={rules.minimumInterval.value}
                className="w-20"
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  minimumInterval: { ...prev.minimumInterval, value: parseInt(e.target.value) }
                }))}
              />
              <Select 
                value={rules.minimumInterval.unit}
                onValueChange={(value) => setRules(prev => ({
                  ...prev,
                  minimumInterval: { ...prev.minimumInterval, unit: value }
                }))}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="minutes">minutos</SelectItem>
                  <SelectItem value="hours">horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )
        }
      ]
    },
    {
      id: "protection",
      title: "Proteção da Linha",
      icon: Shield,
      color: "text-green-600",
      rules: [
        {
          key: "lineUsageLimit",
          title: "Limite de uso da linha",
          description: "Percentual máximo de uso diário para proteger a linha",
          component: (
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                value={rules.lineUsageLimit.value}
                className="w-20"
                max="100"
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  lineUsageLimit: { ...prev.lineUsageLimit, value: parseInt(e.target.value) }
                }))}
              />
              <span className="text-sm text-gray-600">% do limite diário</span>
            </div>
          )
        },
        {
          key: "temporaryBlock",
          title: "Bloqueio temporário",
          description: "Bloquear contato após muitas tentativas sem resposta",
          component: (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Bloquear por</span>
              <Input 
                type="number" 
                value={rules.temporaryBlock.value}
                className="w-20"
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  temporaryBlock: { ...prev.temporaryBlock, value: parseInt(e.target.value) }
                }))}
              />
              <Select 
                value={rules.temporaryBlock.unit}
                onValueChange={(value) => setRules(prev => ({
                  ...prev,
                  temporaryBlock: { ...prev.temporaryBlock, unit: value }
                }))}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="minutes">minutos</SelectItem>
                  <SelectItem value="hours">horas</SelectItem>
                  <SelectItem value="days">dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )
        }
      ]
    },
    {
      id: "behavior",
      title: "Comportamento",
      icon: Users,
      color: "text-purple-600",
      rules: [
        {
          key: "allowNewContacts",
          title: "Permitir contatos novos",
          description: "Enviar mensagens para contatos sem histórico de conversa",
          component: null
        },
        {
          key: "templateRotation",
          title: "Rotação de templates",
          description: "Alternar entre templates com a mesma estrutura automaticamente",
          component: null
        },
        {
          key: "weekendSending",
          title: "Envios em fins de semana",
          description: "Permitir disparos aos sábados e domingos",
          component: null
        }
      ]
    },
    {
      id: "timing",
      title: "Horários",
      icon: MessageSquare,
      color: "text-orange-600",
      rules: [
        {
          key: "sendingWindow",
          title: "Janela de envio",
          description: "Horário permitido para envio de mensagens",
          component: (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Das</span>
              <Input 
                type="time" 
                value={rules.sendingWindow.start}
                className="w-32"
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  sendingWindow: { ...prev.sendingWindow, start: e.target.value }
                }))}
              />
              <span className="text-sm text-gray-600">até</span>
              <Input 
                type="time" 
                value={rules.sendingWindow.end}
                className="w-32"
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  sendingWindow: { ...prev.sendingWindow, end: e.target.value }
                }))}
              />
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Regras de Negócio</h1>
          <p className="text-gray-600">Configure as regras de autorização para disparos</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          As regras são aplicadas em tempo real. Todas as solicitações de disparo são validadas antes do envio para o WhatsApp.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {ruleCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-50 ${category.color}`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>Configure as regras desta categoria</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.rules.map((rule) => (
                <div key={rule.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-3">
                      <Label className="text-base font-medium">{rule.title}</Label>
                      <Switch 
                        checked={rules[rule.key as keyof typeof rules].enabled}
                        onCheckedChange={(checked) => setRules(prev => ({
                          ...prev,
                          [rule.key]: { ...prev[rule.key as keyof typeof rules], enabled: checked }
                        }))}
                      />
                      {rules[rule.key as keyof typeof rules].enabled && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Ativo
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                  </div>
                  
                  {rule.component && rules[rule.key as keyof typeof rules].enabled && (
                    <div className="ml-4">
                      {rule.component}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rules;
