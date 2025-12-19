"use client";

import { useState, useEffect, useCallback } from "react";
import {
  generatePassword,
  generatePasswords,
  PasswordOptions,
} from "@/lib/password-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  RefreshCw,
  Settings2,
  Check,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Moon,
  Sun,
  Monitor,
  LayoutGrid,
  List
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const defaultConfig: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeSimilar: false,
  excludeAmbiguous: false,
};

export default function PasswordGeneratorPage() {
  const [config, setConfig] = useState<PasswordOptions>(defaultConfig);
  const [password, setPassword] = useState("");
  const [batchPasswords, setBatchPasswords] = useState<string[]>([]);
  const [batchCount, setBatchCount] = useState(5);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleGenerate = useCallback(() => {
    try {
      const newPassword = generatePassword(config);
      setPassword(newPassword);
      setHasCopied(false);
    } catch (error: any) {
      toast({
        title: "生成失败",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [config, toast]);

  const handleBatchGenerate = useCallback(() => {
    try {
      const passwords = generatePasswords(config, batchCount);
      setBatchPasswords(passwords);
    } catch (error: any) {
      toast({
        title: "生成失败",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [config, batchCount, toast]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      toast({
        title: "复制成功",
        description: "密码已复制到剪贴板",
      });
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      toast({
        title: "复制失败",
        description: "无法访问剪贴板",
        variant: "destructive",
      });
    }
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score++;
    if (pwd.length > 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              密码生成器
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              安全、加密、本地生成的强密码工具
            </p>
          </div>

          <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            <Button
              variant={theme === "light" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              variant={theme === "dark" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button
              variant={theme === "system" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme("system")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Sidebar */}
          <Card className="lg:col-span-1 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings2 className="h-5 w-5" />
                配置选项
              </CardTitle>
              <CardDescription>自定义您的密码规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Length */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="length">密码长度: {config.length}</Label>
                </div>
                <Slider
                  id="length"
                  min={4}
                  max={64}
                  step={1}
                  value={[config.length]}
                  onValueChange={([val]) => setConfig({ ...config, length: val })}
                />
              </div>

              <Separator />

              {/* Character Types */}
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="uppercase" className="cursor-pointer">包含大写字母 (A-Z)</Label>
                  <Switch
                    id="uppercase"
                    checked={config.includeUppercase}
                    onCheckedChange={(val) => setConfig({ ...config, includeUppercase: val })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="lowercase" className="cursor-pointer">包含小写字母 (a-z)</Label>
                  <Switch
                    id="lowercase"
                    checked={config.includeLowercase}
                    onCheckedChange={(val) => setConfig({ ...config, includeLowercase: val })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="numbers" className="cursor-pointer">包含数字 (0-9)</Label>
                  <Switch
                    id="numbers"
                    checked={config.includeNumbers}
                    onCheckedChange={(val) => setConfig({ ...config, includeNumbers: val })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="symbols" className="cursor-pointer">包含特殊符号 (!@#$)</Label>
                  <Switch
                    id="symbols"
                    checked={config.includeSymbols}
                    onCheckedChange={(val) => setConfig({ ...config, includeSymbols: val })}
                  />
                </div>
              </div>

              <Separator />

              {/* Advanced */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="similar"
                    checked={config.excludeSimilar}
                    onCheckedChange={(val) => setConfig({ ...config, excludeSimilar: !!val })}
                  />
                  <Label htmlFor="similar" className="text-sm font-normal cursor-pointer">
                    排除相似字符 (i, l, 1, L, o, 0, O)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ambiguous"
                    checked={config.excludeAmbiguous}
                    onCheckedChange={(val) => setConfig({ ...config, excludeAmbiguous: !!val })}
                  />
                  <Label htmlFor="ambiguous" className="text-sm font-normal cursor-pointer">
                    排除歧义字符 ({"{ } [ ] ( ) / \\ ' \" ` ~ , ; : . < >"})
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="single" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="single" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  单个生成
                </TabsTrigger>
                <TabsTrigger value="batch" className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  批量生成
                </TabsTrigger>
              </TabsList>

              {/* Single Generation */}
              <TabsContent value="single">
                <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 border-2">
                  <CardHeader>
                    <CardTitle>您的安全密码</CardTitle>
                    <CardDescription>点击刷新按钮生成新密码，或点击复制。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative group">
                      <Input
                        value={password}
                        readOnly
                        className="h-16 text-2xl md:text-3xl font-mono text-center pr-12 bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-slate-800 transition-all focus-visible:ring-primary"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-primary/20 hover:text-primary transition-colors"
                        onClick={handleGenerate}
                      >
                        <RefreshCw className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Strength Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-slate-500">密码强度</span>
                        <span className={`font-medium ${strength <= 2 ? "text-red-500" :
                            strength <= 4 ? "text-amber-500" :
                              "text-emerald-500"
                          }`}>
                          {strength <= 2 ? "较弱" :
                            strength <= 4 ? "中等" :
                              "极强"}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-full flex-1 rounded-full transition-all duration-500 ${i <= strength
                                ? strength <= 2 ? "bg-red-500" :
                                  strength <= 4 ? "bg-amber-500" :
                                    "bg-emerald-500"
                                : "bg-transparent"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full h-12 text-lg font-semibold gap-2 shadow-lg shadow-primary/20"
                      onClick={() => copyToClipboard(password)}
                    >
                      {hasCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      {hasCopied ? "已复制" : "复制密码"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Batch Generation */}
              <TabsContent value="batch">
                <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 border-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>批量生成密码</CardTitle>
                      <CardDescription>一次生成多个安全密码。</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="batch-count" className="text-xs">数量</Label>
                      <Input
                        id="batch-count"
                        type="number"
                        min={1}
                        max={50}
                        value={batchCount}
                        onChange={(e) => setBatchCount(parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {batchPasswords.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400 opacity-50 space-y-2">
                          <List className="h-12 w-12" />
                          <p>点击下方按钮开始生成</p>
                        </div>
                      ) : (
                        batchPasswords.map((p, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-md bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-slate-800 group hover:border-primary/50 transition-all"
                          >
                            <span className="font-mono text-sm sm:text-base break-all">{p}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => copyToClipboard(p)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="secondary"
                      className="w-full h-12 text-lg font-semibold gap-2 border-2"
                      onClick={handleBatchGenerate}
                    >
                      <RefreshCw className="h-5 w-5" />
                      重新生成批量
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Safety Alert */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-4 flex gap-3 text-amber-800 dark:text-amber-200 items-start shadow-sm">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">🔒 关于安全性</p>
                <p>
                  所有密码均使用浏览器的 <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">Web Crypto API</code> 在本地即时生成。
                  这意味着您的数据永远不会离开您的设备，也没有任何第三方可以访问到生成的密码。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-500 dark:text-slate-400 text-sm italic">
          <p>“ 一个好的密码就像一个好的牙刷：认真选择，不要和他人共用，并且每隔几个月换一个新的。”</p>
          <div className="flex gap-4 md:justify-end not-italic font-medium">
            <a href="#" className="hover:text-primary underline">隐私说明</a>
            <a href="#" className="hover:text-primary underline">关于项目</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
