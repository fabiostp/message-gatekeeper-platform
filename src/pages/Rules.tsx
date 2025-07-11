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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Shield, Clock, Users, MessageSquare, Settings, Info, Plus, Copy, Star, Phone, PhoneCall, Search } from "lucide-react";
import { ClientSearchDialog } from "@/components/ClientSearchDialog";

const Rules = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedWaba, setSelectedWaba] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");

  const clients = [
    { 
      id: "1", 
      name: "TechCorp Ltda",
      wabas: [
        { 
          id: "waba_1", 
          name: "WABA Principal",
          lines: [
            { id: "line_1", phone: "+55 11 99999-0001", name: "Atendimento" },
            { id: "line_2", phone: "+55 11 99999-0002", name: "Vendas" },
            { id: "line_3", phone: "+55 11 99999-0003", name: "Suporte" }
          ]
        },
        { 
          id: "waba_2", 
          name: "WABA Marketing",
          lines: [
            { id: "line_4", phone: "+55 11 99999-0004", name: "Campanhas" },
            { id: "line_5", phone: "+55 11 99999-0005", name: "Promoções" }
          ]
        }
      ]
    },
    { 
      id: "2", 
      name: "Marketing Digital Plus",
      wabas: [
        { 
          id: "waba_3", 
          name: "WABA Principal",
          lines: [
            { id: "line_6", phone: "+55 11 99999-0006", name: "Geral" }
          ]
        }
      ]
    },
    { 
      id: "3", 
      name: "E-commerce Solutions",
      wabas: [
        { 
          id: "waba_4", 
          name: "WABA Vendas",
          lines: [
            { id: "line_7", phone: "+55 11 99999-0007", name: "Vendas Online" },
            { id: "line_8", phone: "+55 11 99999-0008", name: "Pós-vendas" }
          ]
        },
        { 
          id: "waba_5", 
          name: "WABA Logística",
          lines: [
            { id: "line_9", phone: "+55 11 99999-0009", name: "Entregas" },
            { id: "line_10", phone: "+55 11 99999-0010", name: "Rastreamento" },
            { id: "line_11", phone: "+55 11 99999-0011", name: "Devoluções" }
          ]
        }
      ]
    }
  ];

  const templates = [
    {
      id: "conservative",
      name: "Conservador",
      description: "Configuração segura para preservar a linha",
      icon: Shield,
      color: "text-green-600",
      isDefault: true
    },
    {
      id: "balanced",
      name: "Equilibrado",
      description: "Configuração balanceada entre segurança e volume",
      icon: Settings,
      color: "text-blue-600",
      isDefault: false
    },
    {
      id: "aggressive",
      name: "Agressivo",
      description: "Configuração para máximo volume de disparos",
      icon: MessageSquare,
      color: "text-orange-600",
      isDefault: false
    }
  ];

  const [rules, setRules] = useState({
    maxMessagesWithoutReply: { enabled: true, value: 3, period: "24h" },
    allowNewContacts: { enabled: false },
    templateRotation: { enabled: true },
    lineUsageLimit: { enabled: true, value: 80 },
    minimumInterval: { enabled: true, value: 30, unit: "minutes" },
    temporaryBlock: { enabled: true, value: 60, unit: "minutes" },
    sendingWindow: { enabled: true, start: "08:00", end: "18:00" },
    weekendSending: { enabled: false },
    engagementRequired: { enabled: true, value: 30 },
    minimumMailingContacts: { enabled: true, value: 10, unit: "percentage" }
  });

  const selectedClientData = clients.find(c => c.id === selectedClient);
  const availableWabas = selectedClientData?.wabas || [];
  const selectedWabaData = availableWabas.find(w => w.id === selectedWaba);
  const availableLines = selectedWabaData?.lines || [];

  const applyTemplate = (templateId: string) => {
    const templateConfigs = {
      conservative: {
        maxMessagesWithoutReply: { enabled: true, value: 2, period: "24h" },
        allowNewContacts: { enabled: false },
        templateRotation: { enabled: true },
        lineUsageLimit: { enabled: true, value: 60 },
        minimumInterval: { enabled: true, value: 60, unit: "minutes" },
        temporaryBlock: { enabled: true, value: 120, unit: "minutes" },
        sendingWindow: { enabled: true, start: "09:00", end: "17:00" },
        weekendSending: { enabled: false },
        engagementRequired: { enabled: true, value: 20 },
        minimumMailingContacts: { enabled: true, value: 5, unit: "percentage" }
      },
      balanced: {
        maxMessagesWithoutReply: { enabled: true, value: 3, period: "24h" },
        allowNewContacts: { enabled: true },
        templateRotation: { enabled: true },
        lineUsageLimit: { enabled: true, value: 80 },
        minimumInterval: { enabled: true, value: 30, unit: "minutes" },
        temporaryBlock: { enabled: true, value: 60, unit: "minutes" },
        sendingWindow: { enabled: true, start: "08:00", end: "18:00" },
        weekendSending: { enabled: false },
        engagementRequired: { enabled: true, value: 30 },
        minimumMailingContacts: { enabled: true, value: 10, unit: "percentage" }
      },
      aggressive: {
        maxMessagesWithoutReply: { enabled: true, value: 5, period: "24h" },
        allowNewContacts: { enabled: true },
        templateRotation: { enabled: true },
        lineUsageLimit: { enabled: true, value: 95 },
        minimumInterval: { enabled: true, value: 15, unit: "minutes" },
        temporaryBlock: { enabled: true, value: 30, unit: "minutes" },
        sendingWindow: { enabled: true, start: "07:00", end: "22:00" },
        weekendSending: { enabled: true },
        engagementRequired: { enabled: true, value: 50 },
        minimumMailingContacts: { enabled: true, value: 20, unit: "percentage" }
      }
    };

    setRules(templateConfigs[templateId as keyof typeof templateConfigs]);
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClient(clientId);
    setSelectedWaba("");
    setSelectedLine("");
  };

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
        },
        {
          key: "minimumMailingContacts",
          title: "Limite mínimo de contatos no mailing",
          description: "Número mínimo de contatos necessários para importar um mailing",
          component: (
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                value={rules.minimumMailingContacts.value}
                className="w-20"
                onChange={(e) => setRules(prev => ({
                  ...prev,
                  minimumMailingContacts: { ...prev.minimumMailingContacts, value: parseInt(e.target.value) }
                }))}
              />
              <Select 
                value={rules.minimumMailingContacts.unit}
                onValueChange={(value) => setRules(prev => ({
                  ...prev,
                  minimumMailingContacts: { ...prev.minimumMailingContacts, unit: value }
                }))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="absolute">contatos</SelectItem>
                  <SelectItem value="percentage">% do limite</SelectItem>
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

  const getSelectedLineDisplay = () => {
    if (selectedLine === "all") {
      return {
        name: "Todas as linhas",
        phone: `${availableLines.length} linha(s) selecionada(s)`,
        isAll: true
      };
    }
    const line = availableLines.find(l => l.id === selectedLine);
    return line ? { ...line, isAll: false } : null;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Regras de Negócio</h1>
          <p className="text-gray-600">Configure as regras de autorização para disparos por linha</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Copy className="h-4 w-4 mr-2" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Templates de Parametrização</DialogTitle>
                <DialogDescription>
                  Escolha um template pré-configurado para aplicar automaticamente às regras
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${template.color}`}>
                        <template.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{template.name}</h3>
                          {template.isDefault && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                              <Star className="h-3 w-3 mr-1" />
                              Padrão
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        applyTemplate(template.id);
                        setShowTemplateDialog(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Aplicar
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Filtros de Cliente, WABA e Linha */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Seleção de Cliente, WABA e Linha</CardTitle>
          <CardDescription>
            Selecione o cliente, WhatsApp Business Account e a linha específica para configurar as regras
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <div className="flex space-x-2">
                <Select value={selectedClient} onValueChange={handleClientSelect}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ClientSearchDialog
                  clients={clients}
                  selectedClient={selectedClient}
                  onClientSelect={handleClientSelect}
                >
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </ClientSearchDialog>
              </div>
            </div>

            <div className="space-y-2">
              <Label>WhatsApp Business Account (WABA)</Label>
              <Select 
                value={selectedWaba} 
                onValueChange={(value) => {
                  setSelectedWaba(value);
                  setSelectedLine("");
                }}
                disabled={!selectedClient}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedClient ? "Selecione uma WABA" : "Primeiro selecione um cliente"} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {availableWabas.map(waba => (
                    <SelectItem key={waba.id} value={waba.id}>
                      <div className="flex flex-col">
                        <span>{waba.name}</span>
                        <span className="text-xs text-gray-500">{waba.lines.length} linha(s)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Linha</Label>
              <Select 
                value={selectedLine} 
                onValueChange={setSelectedLine}
                disabled={!selectedWaba}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedWaba ? "Selecione uma linha" : "Primeiro selecione uma WABA"} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">
                    <div className="flex items-center space-x-2">
                      <PhoneCall className="h-3 w-3" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Todas as linhas</span>
                        <span className="text-xs text-gray-500">Aplicar regras a todas as {availableLines.length} linha(s)</span>
                      </div>
                    </div>
                  </SelectItem>
                  {availableLines.map(line => (
                    <SelectItem key={line.id} value={line.id}>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{line.name}</span>
                          <span className="text-xs text-gray-500">{line.phone}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedClient && selectedWaba && selectedLine && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Configurando regras para <strong>{selectedClientData?.name}</strong> - 
                WABA: <strong>{selectedWabaData?.name}</strong> - 
                {(() => {
                  const lineDisplay = getSelectedLineDisplay();
                  return lineDisplay ? (
                    <>
                      {lineDisplay.isAll ? (
                        <span>
                          <strong>{lineDisplay.name}</strong> ({lineDisplay.phone})
                        </span>
                      ) : (
                        <span>
                          Linha: <strong>{lineDisplay.name}</strong> ({lineDisplay.phone})
                        </span>
                      )}
                    </>
                  ) : null;
                })()}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Configuração das Regras */}
      {selectedClient && selectedWaba && selectedLine && (
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
      )}

      {!selectedClient && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-2">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-medium text-gray-900">Selecione um Cliente</h3>
              <p className="text-gray-600">
                Escolha um cliente, uma WABA e uma linha para começar a configurar as regras de disparo
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Rules;
